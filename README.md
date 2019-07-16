# Madgex Code Task

## Get Started

### System Requirements

You will need:

- [Docker for Desktop](https://www.docker.com/products/docker-desktop).

### Setup

The ```products.csv``` file is not included in the repo as it's quite large. Copy the file into the ```db``` directory.

### Run

To start the environment run:

```docker-compose up -d```

Then open your browser to:

http://localhost:3000/

To stop the environment run:

```docker-compose down```

## Development

### Client: VueJS

To work on client code ```cd client``` to enter the client directory. Run ```npm run serve``` to init the dev server. To export a build run ```npm run build```. This will overwrite the contents of the ```/server/public``` directory.

### Server: NodeJS

To work on server code ```cd server``` to enter the server directory. Run ```npm run dev``` to init the dev server. 


---

## About

### Technology Stack

- [PostgreSQL](https://www.postgresql.org/) database.
- [NodeJS](https://nodejs.org/en/) server. The version is specified in the file ```.nvmrc```.
- Application Server built on NodeJS the [hapi](https://hapijs.com/) framework.
- Front end built with [VueJS](https://vuejs.org/).