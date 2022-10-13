require('dotenv').config()
const express = require('express')
const app = express()
const mysql = require('mysql')

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'zocket',
  port: 3306
})

db.getConnection((err, connection) => {
  if (err) throw err
  console.log('DB connected successful')
})

const port = process.env.PORT
app.listen(port, () => console.log(`Server Started on port ${port}...`))
