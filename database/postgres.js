//not sure if this is right lol but i copied and pasted from docs and added my postgres connectionstring

const { Pool, Client } = require('pg')
const connectionString = ''

const pool = new Pool({
  connectionString: connectionString,
})

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})

const client = new Client({
  connectionString: connectionString,
})
client.connect()

client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})