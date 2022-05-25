const pg = require('pg');

let config;
if (process.env.DATABASE_URL) {
   config = {
      // We use the DATABASE_URL from Heroku to connect to our DB
      connectionString: process.env.DATABASE_URL,
      // Heroku also requires this special `ssl` config
      ssl: { rejectUnauthorized: false },
   }
} else {
   config = {
      host: 'localhost',
      port: 1234,
      database: 'tasks', // CHANGE THIS LINE to match your local database name!   
      max: 10, // max number of clients in the pool
      idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
   };
}

//
const pool = new pg.Pool(config);

pool.on('connect', () => {
    console.log('connected to postgres');
})

pool.on('error', (err) => {
    console.log('error connecting to postgres', err)
})

module.exports = pool;