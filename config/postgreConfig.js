// const {Client} = require('pg');
//
// const client = new Client({
//     user: 'postgres',
//     host: '192.168.1.120',
//     database: 'postgres',
//     password: 'root',
//     port: 5432,
// });
// client.connect();
//
// module.exports = client;

const {Pool} = require('pg');

// const dbConfig = {
//     user: 'postgres',
//     host: '192.168.1.119',
//     database: 'cxo',
//     password: 'root',
//     port: 5432,
// };

const dbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'cxo',
    password: 'Motifworks@1234',
    port: 5432,
};

const pool = new Pool(dbConfig);

pool.on('error', err => {
    console.error('Postgres Config :: Idle Connection :: ', err);
});

module.exports = pool;