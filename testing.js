process.env = require('./config.json');

const db = require('./database/index');

const mariadb = require('mariadb');





async function asyncFunction() {
    const conn = await mariadb.createConnection(process.env.mysql);
    console.log("E")
  try {
    const res = await conn.query('select 1', [2]);
    console.log(res); // [{ "1": 1 }]
    return res;
   } finally {
    conn.end();
   }
}

asyncFunction();