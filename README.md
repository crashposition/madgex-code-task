# Madgex Code Task

## Get Started

### System Requirements

You will need:

- [Docker for Desktop](https://www.docker.com/products/docker-desktop).

### Setup

1. The ```products.csv``` file is not included in the repo as it's quite large. Copy the file into the ```db``` directory.

2. Copy or rename the file ```server/.env.example``` as ```server/.env```. This contains environment variables for the app server.

### Run

To start the full environment run:

```docker-compose up -d```

To view the web client open your browser to:

http://localhost:3000/

To view the products API open your browser to:

http://localhost:3000/products?limit=20&offset=0

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
- Application Server built on NodeJS the [hapi](https://hapijs.com/) framework.
- Front end built with [VueJS](https://vuejs.org/).