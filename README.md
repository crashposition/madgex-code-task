# Madgex Code Task

## Get Started

### System Requirements

You will need:

- [Docker for Desktop](https://www.docker.com/products/docker-desktop).

### Setup

1. The ```products.csv``` file is not included in the repo as it's quite large. Copy this file into the ```db``` directory.

2. Copy or rename the file ```server/.env.example``` as ```server/.env```. This contains environment variables for the app server.

### Start

To start the full environment run:

```docker-compose up -d```

Please wait. Progress information can be found in your console. 

1. The database will be initialised from the products.csv file. This can take a while. 

2. The API and web server will wait for the database to be available before launching.

When available, you can view the web client from your browser at: http://localhost:3000/

To view the products API open your browser to:

http://localhost:3000/products?limit=20&offset=0

### Stop

To stop the environment hit ```Ctrl C``` then run:

```docker-compose down```

## Development

### Database: Postgres

To start the database for development run:

```docker-compose -f docker-compose.dev.yml up```

To stop the database hit ```Ctrl C``` then run:

```docker-compose down```

### Server: NodeJS

To work on server code ```cd server``` to enter the server directory. Run ```npm run dev``` to init the dev server. Open your browser to http://localhost:3000

### Client: VueJS

To work on client code ```cd client``` to enter the client directory. Run ```npm run serve``` to init the dev server. Open your browser to http://localhost:8080

To export a build run ```npm run build```. This will overwrite the contents of the ```/server/public``` directory.

---

## About

### Technology Stack

- [PostgreSQL](https://www.postgresql.org/) database.
- [NodeJS](https://nodejs.org/en/) server. The version is specified in the file ```.nvmrc```.
- Application Server built on NodeJS with the [hapi](https://hapijs.com/) framework.
- Front end built with [VueJS](https://vuejs.org/).

---

## Data Import

The import script can be found in ```/db/init-db.sh``` 

The broad steps are:

1. We clean the data. There are a few null fields in the ```products.csv``` file. We clean this file by removing comments and empty lines and replacing any double commas with single to remove the nulls. We then export a new ```products_clean.csv``` file.

2. The script imports the ```products_clean.csv``` file into a temporary ```raw``` table. This table is used to build out the other tables.

### Insert Efficiency

Q. We'd like you to describe an efficient approach to inserting the file. How would this approach scale?

A. The Postgres COPY command is the fastest way I know to import CSV data. This copes very well, even at scale. Other factors that improve efficiency are that we import all the data in a single transaction. We also don't have any expensive indexes or constraints on the raw table.

### Personal Analysis

I think the import step is quite efficient but the post import table generation steps are brute force and could be improved. 
