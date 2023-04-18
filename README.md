# Zencon Project
## Description
zencon is a web application that allows developers to upload their ideas and projects with detailed information. This project uses Node.js and the following technologies: Express, Sequelize, PostgreSQL, Axios, Joi, Morgan, Cors, and Express Rate Limit.
## Installation
- Clone this repository: `git clone https://git.qinez.com/launchpad/zencon.git`
- Navigate to the project directory: `cd zencon`
- Install dependencies: `npm install`
## Usage
To start the server in production mode, run:

```js
npm start
```

To start the server in development mode, run:

```js
npm run start:dev
```

To start the server in staging mode, run:

```js
npm run start:stage
```

To start the server with nodemon (for development), run:

```js
npm run dev
```

## Dependencies
- axios: ^1.3.4
- cors: ^2.8.5
- express: ^4.18.2
- express-rate-limit: ^6.7.0
- joi: ^17.8.3
- morgan: ^1.10.0
- pg: ^8.9.0
- pg-hstore: ^2.3.4
- sequelize: ^6.28.0

## Dev Dependencies
- nodemon: ^2.0.20