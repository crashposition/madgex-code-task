#!/bin/bash

set -e
set -u
echo "init-db begins"

CREATE_RAW_TABLE_SQL=$(cat <<EOF
    CREATE TABLE raw (
        product_name    VARCHAR(200)    NOT NULL,
        product_sku UUID   NOT NULL  PRIMARY KEY,
        advertiser_name VARCHAR(100)    NOT NULL);
EOF
)

CREATE_PRODUCTS_TABLE_SQL=$(cat <<EOF
    CREATE TABLE products (
        product_name    VARCHAR(200)    NOT NULL,
        product_sku UUID   NOT NULL  PRIMARY KEY,
        advertiser_id  UUID  NOT NULL);
EOF
)

CREATE_ADVERTISERS_TABLE_SQL=$(cat <<EOF
    CREATE TABLE advertisers (
        advertiser_id  UUID  PRIMARY KEY,
        advertiser_name VARCHAR(100) NOT NULL);
EOF
)

DROP_RAW_TABLE_SQL=$(cat <<EOF
    DROP TABLE raw;
EOF
)

# Create Postgres Tables
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
$CREATE_RAW_TABLE_SQL
$CREATE_PRODUCTS_TABLE_SQL
$CREATE_ADVERTISERS_TABLE_SQL
$DROP_RAW_TABLE_SQL
commit;
EOSQL


echo "init-db complete"
exit 0