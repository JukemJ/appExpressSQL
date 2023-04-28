const sql = require("mssql")
require("dotenv").config({path:"./config/.env"})

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}

async function connectDB(){
    try {
        const poolConnection = await new sql.ConnectionPool(config).connect()
        console.log(`SQL Server Connected!`)
        return poolConnection
    } 
    
    catch (err) {
        console.log('Could not connect...')
        console.error(err)
    }
  }

const poolConnection = connectDB()

module.exports = { poolConnection }