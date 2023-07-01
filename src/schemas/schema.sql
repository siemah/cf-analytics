CREATE TABLE IF NOT EXISTS analytics (
  id integer PRIMARY KEY AUTOINCREMENT,
  uuid text NOT NULL,
  url text NOT NULL,
  ip text NOT NULL,
  longitude text NOT NULL,
  latitude text NOT NULL,
  country text NOT NULL,
  city text NOT NULL,
  region text NOT NULL,
  regionCode text NOT NULL,
  asOrganization text NOT NULL,
  postalCode text NOT NULL,
  dataCenterCode text NOT NULL,
  browser text NOT NULL,
  os, text NOT NULL,
  clientAcceptEncoding text NOT NULL,
  tlsVersion text NOT NULL,
  timezone text NOT NULL,
  httpProtocol text NOT NULL,
  language text NOT NULL,
  createdAt timestamp NOT NULL
);
CREATE INDEX idx_analytics_id ON analytics (id);
CREATE INDEX idx_analytics_country ON analytics (country);
CREATE INDEX idx_analytics_region ON analytics (region);
CREATE INDEX idx_analytics_os ON analytics (os);
CREATE INDEX idx_analytics_browser ON analytics (browser);

-- Optionally, uncomment the below query to create data