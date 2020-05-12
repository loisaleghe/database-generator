const mysql = require ('mysql2')

const defaultConfig = {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'Slois123.',
      database: 'employee-tracker'
  }
  
  module.exports = mysql.createConnection(defaultConfig).promise()
  



