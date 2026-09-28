import mysql from 'mysql'

const db = mysql.createConnection({
    host: '192.168.1.1',
    user: 'root',
    password: '1234',
<<<<<<< HEAD
    database: 'bd_vibetrack'
=======
    database: 'vibetrack'
>>>>>>> e2d7b134265708a889d118c663e6edcfeefa77fa
})

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err.message)
    } else {
        console.log('Conectado ao MySQL')
    }
})
