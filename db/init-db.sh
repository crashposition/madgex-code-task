#!/bin/bash

set -e
set -u

INIT_UUID_SQL=$(cat <<EOF
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
EOF
)


# IMPORT RAW DATA
CREATE_RAW_TABLE_SQL=$(cat <<EOF
    CREATE TABLE raw (
        product_name TEXT NOT NULL,
        product_sku UUID NOT NULL,
        advertiser_name TEXT NOT NULL );
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

# Create final tables
CREATE_ADVERTISERS_TABLE_SQL=$(cat <<EOF
    CREATE TABLE advertisers (
        advertiser_id SERIAL PRIMARY KEY,
        advertiser_name TEXT NOT NULL UNIQUE);
EOF
)

CREATE_PRODUCTS_TABLE_SQL=$(cat <<EOF
    CREATE TABLE products (
        product_id SERIAL PRIMARY KEY,
        product_name TEXT NOT NULL UNIQUE);
EOF
)

CREATE_PRODUCT_SKUS_TABLE_SQL=$(cat <<EOF
    CREATE TABLE product_skus (
        product_sku UUID PRIMARY KEY,
        product_id INTEGER REFERENCES products (product_id),
        advertiser_id INTEGER REFERENCES advertisers (advertiser_id));
EOF
)

# Populate tables
POPULATE_ADVERTISERS_TABLE_SQL=$(cat <<EOF
    INSERT INTO advertisers ( advertiser_name)
        SELECT distinct(advertiser_name) FROM raw;
EOF
)

POPULATE_PRODUCTS_TABLE_SQL=$(cat <<EOF
    INSERT INTO products ( product_name)
        SELECT distinct(product_name) FROM raw;
EOF
)

# Update raw data
ADD_PRODUCT_ID_COLUMN_TO_RAW_SQL=$(cat <<EOF
    ALTER TABLE raw ADD COLUMN product_id INTEGER;
EOF
)
ADD_PRODUCT_IDS_COLUMN_TO_RAW_SQL=$(cat <<EOF
    UPDATE raw SET product_id=products.product_id FROM products
        WHERE raw.product_name=products.product_name;
EOF
)
ADD_ADVERTISER_ID_COLUMN_TO_RAW_SQL=$(cat <<EOF
    ALTER TABLE raw ADD COLUMN advertiser_id INTEGER;
EOF
)
ADD_ADVERTISER_IDS_COLUMN_TO_RAW_SQL=$(cat <<EOF
    UPDATE raw SET advertiser_id=advertisers.advertiser_id FROM advertisers
        WHERE raw.advertiser_name=advertisers.advertiser_name;
EOF
)

# Product SKUs
POPULATE_PRODUCT_SKUS_TABLE_1_SQL=$(cat <<EOF
    INSERT INTO product_skus ( product_sku )
        SELECT distinct(product_sku) FROM raw;
EOF
)
POPULATE_PRODUCT_SKUS_TABLE_2_SQL=$(cat <<EOF
    UPDATE product_skus SET product_id=raw.product_id FROM raw
        WHERE raw.product_sku=product_skus.product_sku;
EOF
)
POPULATE_PRODUCT_SKUS_TABLE_3_SQL=$(cat <<EOF
    UPDATE product_skus SET advertiser_id=raw.advertiser_id FROM raw
        WHERE raw.product_sku=product_skus.product_sku;
EOF
)


echo "Please wait... Cleaning products.csv."

# Clean up raw data
# Remove comments and empty lines. Replace double commas with single.
cat /docker-entrypoint-initdb.d/products.csv | grep -v "^#" | sed '/^ *$/d' | sed 's/,\{2,\}/,/g' > /docker-entrypoint-initdb.d/products_clean.csv

echo "Please wait... Importing raw data"

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
$INIT_UUID_SQL
$CREATE_RAW_TABLE_SQL
$IMPORT_RAW_DATA_SQL
commit;
EOSQL


echo "Please wait... populating advertisers"

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
$CREATE_ADVERTISERS_TABLE_SQL
$POPULATE_ADVERTISERS_TABLE_SQL
$ADD_ADVERTISER_ID_COLUMN_TO_RAW_SQL
$ADD_ADVERTISER_IDS_COLUMN_TO_RAW_SQL
commit;
EOSQL


echo "Please wait... populating products"

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
$CREATE_PRODUCTS_TABLE_SQL
$POPULATE_PRODUCTS_TABLE_SQL
$ADD_PRODUCT_ID_COLUMN_TO_RAW_SQL
$ADD_PRODUCT_IDS_COLUMN_TO_RAW_SQL
commit;
EOSQL


echo "Please wait... populating product skus"

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
$CREATE_PRODUCT_SKUS_TABLE_SQL
$POPULATE_PRODUCT_SKUS_TABLE_1_SQL
$POPULATE_PRODUCT_SKUS_TABLE_2_SQL
$POPULATE_PRODUCT_SKUS_TABLE_3_SQL
commit;
EOSQL


echo "Please wait... cleaning up"

# Remove the raw table
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
$DROP_RAW_TABLE_SQL
commit;
EOSQL

echo "Database ready"
exit 0