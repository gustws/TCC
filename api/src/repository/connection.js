import mysql from 'mysql2/promise'

const con = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'MesaCheiaDB',
  password: 'root',
  dateStrings: true
})

console.log('Conectou com o MySQL');

export { con };

