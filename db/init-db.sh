#!/bin/bash

set -e
set -u
echo "init-db begins"

# IMPORT RAW DATA
CREATE_RAW_TABLE_SQL=$(cat <<EOF
    CREATE TABLE raw (
        product_name    VARCHAR(200)    NOT NULL,
        product_sku UUID   NOT NULL  PRIMARY KEY,
        advertiser_name VARCHAR(100)    NOT NULL);
EOF
)

IMPORT_RAW_DATA_SQL=$(cat <<EOF
    COPY raw FROM '/docker-entrypoint-initdb.d/products_clean.csv' CSV HEADER;
EOF
)

DROP_RAW_TABLE_SQL=$(cat <<EOF
    DROP TABLE raw;
EOF
)

# FINAL SCHEMA
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

# Clean up raw data
# Remove comments and empty lines. Replace double commas with single.
cat /docker-entrypoint-initdb.d/products.csv | grep -v "^#" | sed '/^ *$/d' | sed 's/,\{2,\}/,/g' > /docker-entrypoint-initdb.d/products_clean.csv


# Import raw data
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
$CREATE_RAW_TABLE_SQL
$IMPORT_RAW_DATA_SQL
commit;
EOSQL

# Create final tables
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
$CREATE_PRODUCTS_TABLE_SQL
$CREATE_ADVERTISERS_TABLE_SQL
commit;
EOSQL

# TODO: Populate final tables from raw table

# Clean up raw table
#psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
#$DROP_RAW_TABLE_SQL
#commit;
#EOSQL


echo "init-db complete"
exit 0