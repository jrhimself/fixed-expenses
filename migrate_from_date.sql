CREATE TABLE vaste_last_jaar_overrides_new (
  last_id INTEGER REFERENCES vaste_lasten(id) ON DELETE CASCADE,
  jaar INTEGER NOT NULL,
  vanaf_datum TEXT NOT NULL DEFAULT '0000-00-00',
  bedrag REAL,
  naam TEXT,
  categorie TEXT,
  verwachte_dag INTEGER,
  iban_tegenrekening TEXT,
  omschrijving_patroon TEXT,
  actief INTEGER,
  afwijking_drempel REAL,
  variabel INTEGER,
  PRIMARY KEY (last_id, jaar, vanaf_datum)
);
INSERT INTO vaste_last_jaar_overrides_new (last_id, jaar, vanaf_datum, bedrag, naam, categorie, verwachte_dag, iban_tegenrekening, omschrijving_patroon, actief, afwijking_drempel)
  SELECT last_id, jaar, '0000-00-00', bedrag, naam, categorie, verwachte_dag, iban_tegenrekening, omschrijving_patroon, actief, afwijking_drempel FROM vaste_last_jaar_overrides;
DROP TABLE vaste_last_jaar_overrides;
ALTER TABLE vaste_last_jaar_overrides_new RENAME TO vaste_last_jaar_overrides;
