const { uniqueNamesGenerator, names } = require('unique-names-generator')
const config = {
    host: 'desafio-node-db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const mysql = require('mysql')

exports.createTable = function () {
    const connection = createConnection()
    try {
        const sqlCreateTable = 'CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255) not null, primary key(id));'
        connection.query(sqlCreateTable)
    } catch (error) {
        console.error('Error to create table')
    }
    endConnection(connection)
}

exports.insertTable = function () {
    const connection = createConnection()
    return new Promise((resolve, reject) => {
        const sqlInsert = `INSERT INTO people(name) values('${generateName()}')`
        connection.query(sqlInsert, (error, result, field) => {
            endConnection(connection)
            if(error) return reject(error)
            resolve()
        })
    })
    
}

const generateName = () => uniqueNamesGenerator({
    dictionaries: [names]
})

exports.selectTable = function () {
    const connection = createConnection()
    return new Promise((resolve, reject) => {
        const sqlSelect = 'SELECT * FROM people'
        connection.query(sqlSelect, (error, result, field) => {
            endConnection(connection)
            if(error) return reject(error)
            resolve(Object.values(JSON.parse(JSON.stringify(result))))
        })
    })
}

const createConnection = () => {
    try {
        const connection = mysql.createConnection(config)
        connection.connect();
        console.log('Connected to MySQL server.')
        return connection;
    } catch (error) {
        console.error('Error connecting to MySQL:', error)
        return null;
    }
}

const endConnection = (connection) => {
    if (connection) {
        try {
            connection.end();
            console.log('MySQL connection closed.')
        } catch (error) {
            console.error('Error closing MySQL connection:', error)
        }
    }
}