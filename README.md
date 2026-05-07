# Vaste Lasten Tracker

A personal finance web app to track recurring costs, import bank statements, and manage your budget per salary period.

## Features

- **Dashboard** — Overview of recurring costs per period with status (paid, open, skipped)
- **Deviation marking** — Rows are highlighted yellow when the debited amount deviates from the expected amount
- **Variable costs** — Mark costs as variable to skip deviation highlighting; amount becomes optional
- **Bank import** — CSV import from ING, ABN AMRO and Rabobank with automatic format detection
- **Auto-matching** — Transactions are matched to recurring costs based on IBAN, description pattern, name, or amount (debits only)
- **Boundary matching** — Transactions up to 20 days outside a period can still be matched to that period
- **Periods** — Budget periods based on your salary day, auto-generated per year
- **Year overview** — Aggregated view across all periods in a year
- **Year overrides** — Per-year customization of cost name, amount, category, and expected day
- **Categories** — Group recurring costs and view the distribution in charts
- **Charts** — Pie chart by category and bar chart by period
- **Permanent delete** — Fully remove a recurring cost (no deactivation/reactivation)

## Tech Stack

| Laag | Technologie |
|------|-------------|
| Frontend | Vanilla HTML/CSS/JS, Chart.js |
| Backend | Cloudflare Workers (Pages Functions) |
| Database | Cloudflare D1 (SQLite) |
| Hosting | Cloudflare Pages |
| CI/CD | GitHub Actions (lint → test → deploy) |
| Tests | Vitest |
| Linting | ESLint v9 |

## Project structure

```
├── functions/api/[[route]].js   # API handler (serverless)
├── lib/
│   ├── automatch.js             # Match logic (exported for tests)
│   └── csv.js                   # CSV parsing (exported for tests)
├── public/
│   ├── index.html               # Single-page app
│   ├── app.js                   # Frontend logic
│   ├── style.css                # Styling
│   └── chart.min.js             # Chart.js library
├── test/
│   ├── automatch.test.js        # Unit tests for match logic
│   └── csv.test.js              # Unit tests for CSV parsing
├── schema.sql                   # Database schema
├── migrate_from_date.sql        # Migration: add vanaf_datum column
├── wrangler.toml                # Cloudflare configuration
├── eslint.config.js             # ESLint configuration
├── CHANGELOG.md                 # Version history
└── .github/
    ├── workflows/deploy.yml     # CI/CD pipeline (lint → test → deploy)
    └── pull_request_template.md # PR template
```

## Lokaal draaien (zonder Cloudflare)

Geen Cloudflare account nodig. De app draait volledig lokaal met een SQLite database op je eigen computer. Kies hieronder je besturingssysteem.

---

### Windows

#### Stap 1 — Node.js installeren

Ga naar [nodejs.org](https://nodejs.org/) en download de **LTS** versie. Voer het installatieprogramma uit en klik alles op "Next".

Of via [winget](https://learn.microsoft.com/en-us/windows/package-manager/winget/) als je dat hebt:

```
winget install OpenJS.NodeJS.LTS
```

#### Stap 2 — Git installeren

Ga naar [git-scm.com/downloads](https://git-scm.com/downloads/win) en download Git voor Windows. Voer het installatieprogramma uit (standaardinstellingen zijn prima).

#### Stap 3 — Controleer de installatie

Open **Opdrachtprompt** of **PowerShell** (zoek op "cmd" of "powershell" in het Startmenu) en typ:

```
node --version
git --version
```

Beide commando's moeten een versienummer tonen. Als dat lukt, ga dan verder.

#### Stap 4 — Download de app

```
git clone https://github.com/jrhimself/vastelasten.git
cd vastelasten
npm install
```

#### Stap 5 — Wachtwoord instellen (optioneel)

Maak in de map `vastelasten` een bestand aan met de naam `.env`. Open Kladblok, plak de onderstaande regels, en sla op als `.env` (let op: niet als `.env.txt`):

```
AUTH_PASSWORD=kies-een-wachtwoord
AUTH_SECRET=willekeurige-geheime-sleutel
```

> Wil je geen wachtwoord? Sla deze stap over — de app is dan direct toegankelijk.

#### Stap 6 — Start de app

```
npm start
```

Open je browser op **http://localhost:3000**.

---

### Linux (Ubuntu / Debian / Raspberry Pi)

#### Stap 1 — Node.js installeren

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Of via [nvm](https://github.com/nvm-sh/nvm) als je meerdere Node versies wilt beheren:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.bashrc
nvm install 22
```

#### Stap 2 — Git installeren

Op de meeste Linux-systemen is Git al aanwezig. Zo niet:

```bash
sudo apt-get install -y git
```

#### Stap 3 — Controleer de installatie

```bash
node --version
git --version
```

#### Stap 4 — Download de app

```bash
git clone https://github.com/jrhimself/vastelasten.git
cd vastelasten
npm install
```

#### Stap 5 — Wachtwoord instellen (optioneel)

```bash
cp .env.example .env
nano .env
```

Pas de waarden aan en sla op met `Ctrl+O`, daarna `Enter`, dan `Ctrl+X`.

> Wil je geen wachtwoord? Sla deze stap over — de app is dan direct toegankelijk.

#### Stap 6 — Start de app

```bash
npm start
```

Open je browser op **http://localhost:3000**.

Op een server zonder browser (bijv. Raspberry Pi): open de app op een ander apparaat via `http://<ip-adres>:3000`. Je vindt het IP-adres met `hostname -I`.

---

### Updaten naar een nieuwe versie

Zelfde stappen voor Windows en Linux:

```bash
git pull
npm install
npm start
```

Je gegevens in `vastelasten.db` blijven bewaard.

---

### Veelgestelde vragen

**Andere poort?** Voeg `PORT=4000` toe aan je `.env` bestand.

**App stoppen?** Druk op `Ctrl + C` in de terminal.

**App start niet op?** Controleer of `node --version` versie 22 of hoger toont en of je `npm install` hebt uitgevoerd.

---

## Local development (Cloudflare / Wrangler)

```bash
npm install
npx wrangler pages dev public/ --d1 DB=vaste-lasten-db
```

This starts a local dev server with a local D1 database. On first run, apply the schema:

```bash
npx wrangler d1 execute vaste-lasten-db --local --file=schema.sql
```

## Tests

```bash
npm test
```

Runs unit tests with Vitest for match logic and CSV parsing.

## Deployment

The app is automatically deployed to Cloudflare Pages on every push. The GitHub Actions workflow:

1. **lint** and **test** — Run in parallel: ESLint check + unit tests
2. **deploy** — Deploys via `wrangler-action@v3` to Cloudflare Pages (only if lint and test pass)

Feature branches get a preview URL (`https://feature-vX-Y-Z.vaste-lasten.pages.dev`). Merging to `main` requires a PR and a passing `test` check.

**Required GitHub Secrets:**
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Versioning

Semantic versioning (semver). Feature branches are created as `feature/vX.Y.Z`. All changes are tracked in [`CHANGELOG.md`](CHANGELOG.md).

- **PATCH** (1.0.x) — Bug fixes
- **MINOR** (1.x.0) — New features
- **MAJOR** (x.0.0) — Breaking changes

The current version is displayed at the bottom of the sidebar menu in the app.

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/lasten` | Get all recurring costs |
| `POST` | `/api/lasten` | Create a recurring cost |
| `PUT` | `/api/lasten/:id` | Update a recurring cost |
| `DELETE` | `/api/lasten/:id` | Permanently delete a recurring cost |
| `GET` | `/api/periodes` | Get all periods |
| `POST` | `/api/periodes` | Create a new period |
| `POST` | `/api/periodes/genereer/:jaar` | Generate periods for a year |
| `GET` | `/api/periodes/jaar/:jaar/overzicht` | Year overview with all periods |
| `GET` | `/api/periodes/:id/overzicht` | Period overview with linked transactions |
| `POST` | `/api/periodes/:id/hermatchen` | Re-match all transactions in a period |
| `POST` | `/api/periodes/:id/hermatchen/:last_id` | Re-match a specific cost in a period |
| `POST` | `/api/periodes/:id/koppel/:last_id` | Manually link a transaction to a cost |
| `GET` | `/api/periodes/:id/alle-ongekoppeld` | Get unlinked transactions (incl. boundary) |
| `POST` | `/api/periodes/verwijder-duplicaten` | Remove duplicate periods |
| `POST` | `/api/import/preview` | Preview a CSV file |
| `POST` | `/api/import/opslaan` | Save imported transactions |
| `GET` | `/api/statistieken` | Get chart data |
| `GET` | `/api/transacties` | Search transactions |
| `GET/PUT` | `/api/instellingen` | Manage settings |
| `GET/POST/PUT/DELETE` | `/api/jaar-overrides` | Manage per-year cost overrides |

## Database

Seven tables in Cloudflare D1 (SQLite):

- **vaste_lasten** — Recurring costs with name, amount, category, IBAN, description pattern, and variable flag
- **periodes** — Budget periods with start/end date and salary amount
- **bank_transacties** — Imported bank transactions linked to a cost and period
- **periode_overgeslagen** — Skipped costs per period
- **vaste_last_periode_actief** — Per-period activation of costs
- **vaste_last_jaar_overrides** — Per-year customization of cost properties (amount, name, category, etc.)
- **instellingen** — Key-value settings (e.g. salary day)

## License

Private project.
