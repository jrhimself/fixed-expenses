import express from 'express';
import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Load .env file if present (no external dependency needed)
try {
  const envFile = fs.readFileSync(join(dirname(fileURLToPath(import.meta.url)), '.env'), 'utf8');
  for (const line of envFile.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...rest] = trimmed.split('=');
    if (key && rest.length) process.env[key.trim()] ??= rest.join('=').trim();
  }
} catch { /* geen .env bestand, dat is prima */ }

const __dirname = dirname(fileURLToPath(import.meta.url));

// ===== Database setup =====

const dbPath = process.env.DB_PATH || join(__dirname, 'vastelasten.db');
const db = new DatabaseSync(dbPath);
db.exec('PRAGMA journal_mode = WAL');
db.exec('PRAGMA foreign_keys = ON');

const schema = fs.readFileSync(join(__dirname, 'schema.sql'), 'utf8');
db.exec(schema);

// ===== D1 shim =====
// Mimics the Cloudflare D1 API so the existing route handler works unchanged.

class D1Statement {
  constructor(db, sql, params = []) {
    this._db = db;
    this._sql = sql;
    this._params = params;
  }

  bind(...params) {
    return new D1Statement(this._db, this._sql, params);
  }

  async all() {
    return { results: this._db.prepare(this._sql).all(...this._params) };
  }

  async first() {
    return this._db.prepare(this._sql).get(...this._params) ?? null;
  }

  async run() {
    const info = this._db.prepare(this._sql).run(...this._params);
    return { meta: { last_row_id: Number(info.lastInsertRowid), changes: info.changes } };
  }

  _execSync() {
    return this._db.prepare(this._sql).run(...this._params);
  }
}

class D1Database {
  constructor(db) {
    this._db = db;
  }

  prepare(sql) {
    return new D1Statement(this._db, sql);
  }

  async batch(statements) {
    this._db.exec('BEGIN');
    try {
      const results = statements.map(s => s._execSync());
      this._db.exec('COMMIT');
      return results;
    } catch (e) {
      this._db.exec('ROLLBACK');
      throw e;
    }
  }
}

// ===== Load route handler =====

const { onRequest } = await import('./functions/api/[[route]].js');

// ===== Express app =====

const app = express();
const PORT = process.env.PORT || 3000;

const env = {
  DB: new D1Database(db),
  AUTH_SECRET: process.env.AUTH_SECRET || '',
  AUTH_PASSWORD: process.env.AUTH_PASSWORD || '',
};

// Serve frontend
app.use(express.static(join(__dirname, 'public')));

// Adapter: Express request → Fetch API Request → onRequest → Express response
app.all('/api/*', async (req, res) => {
  try {
    const chunks = [];
    await new Promise((resolve, reject) => {
      req.on('data', chunk => chunks.push(chunk));
      req.on('end', resolve);
      req.on('error', reject);
    });
    const rawBody = Buffer.concat(chunks);

    const url = `http://localhost:${PORT}${req.url}`;
    const headers = new Headers();
    for (const [key, val] of Object.entries(req.headers)) {
      if (val != null) headers.set(key, Array.isArray(val) ? val.join(', ') : val);
    }

    const hasBody = rawBody.length > 0 && req.method !== 'GET' && req.method !== 'HEAD';
    const fetchRequest = new Request(url, {
      method: req.method,
      headers,
      body: hasBody ? rawBody : undefined,
      duplex: 'half',
    });

    const response = await onRequest({ request: fetchRequest, env });

    res.status(response.status);
    response.headers.forEach((val, key) => res.setHeader(key, val));
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Vaste Lasten draait op http://localhost:${PORT}`);
  if (!process.env.AUTH_PASSWORD) {
    console.log('Tip: stel AUTH_PASSWORD en AUTH_SECRET in via een .env bestand om authenticatie in te schakelen.');
  }
});
