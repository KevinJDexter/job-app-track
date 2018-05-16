const Pool = require('pg').Pool;
const url = require('url');

let config;

if (process.env.DATABASE_URL) {

  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true,
    max: 10,
    idleTimeoutMillis: 30000
  }

} else {
  config = {
    host: 'localhost',
    port: 5432,
    database: 'job_applications',
    max: 10,
    idleTimeoutMillis: 30000
  }
}

const pool = new Pool(config);

pool.on('connect', (client) => {
  console.log('connected to postgresql');
})

pool.on('error', (error, client) => {
  console.log('error connecting to postgresql:', error);
  process.exit(-1);
})

module.exports = pool;