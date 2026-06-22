import mysql from 'mysql'

const db = mysql.createConnection({
    host: '192.168.1.1',
    user: 'root',
    password: '1234',
    database: 'vibetrack'
})

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err.message)
    } else {
        console.log('Conectado ao MySQL')
    }
})
