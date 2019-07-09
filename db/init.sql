CREATE TABLE products
(
    id  SERIAL  PRIMARY KEY,
    name    VARCHAR(200)    NOT NULL,
    sku VARCHAR(100) NOT NULL,
    advertiser VARCHAR(100) NOT NULL,
    advertiser_id   INTEGER
);

CREATE TABLE advertisers
(
    id  SERIAL  PRIMARY KEY,
    advertiser VARCHAR(100) NOT NULL
);