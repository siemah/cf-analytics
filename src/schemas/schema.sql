-- DROP TABLE IF EXISTS statytics;
CREATE TABLE IF NOT EXISTS statytics (
  id integer PRIMARY KEY AUTOINCREMENT,
  uuid TEXT NULL,
  url TEXT NULL,
  ip TEXT NULL,
  longitude TEXT NULL,
  latitude TEXT NULL,
  country TEXT NULL,
  city TEXT NULL,
  region TEXT NULL,
  regionCode TEXT NULL,
  asOrganization TEXT NULL,
  postalCode TEXT NULL,
  dataCenterCode TEXT NULL,
  browser TEXT NULL,
  os, TEXT NULL,
  clientAcceptEncoding TEXT NULL,
  tlsVersion TEXT NULL,
  timezone TEXT NULL,
  httpProtocol TEXT NULL
);
CREATE INDEX idx_statytics_id ON statytics (id);
CREATE INDEX idx_statytics_url ON statytics (url);
CREATE INDEX idx_statytics_country ON statytics (country);
CREATE INDEX idx_statytics_region ON statytics (region);
CREATE INDEX idx_statytics_browser ON statytics (browser);