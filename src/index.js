import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host: '192.168.1.1',
    user: 'root',
    password: '361820Vn',
    database: 'vibetrack'
})

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err.message)
    } else {
        console.log('Conectado ao MySQL')
    }
})

app.post('/cadastro', (req, res) => {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
        return res.status(400).json({ erro: 'Preencha todos os campos.' })
    }

    const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)'
    db.query(sql, [nome, email, senha], (err) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ erro: 'E-mail já cadastrado.' })
            }
            return res.status(500).json({ erro: 'Erro ao cadastrar.' })
        }
        res.status(201).json({ mensagem: 'Cadastro realizado com sucesso!' })
    })
})

app.post('/login', (req, res) => {
    const { email, senha } = req.body

    if (!email || !senha) {
        return res.status(400).json({ erro: 'Preencha todos os campos.' })
    }

    const sql = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?'
    db.query(sql, [email, senha], (err, results) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao fazer login.' })
        }
        if (results.length === 0) {
            return res.status(401).json({ erro: 'E-mail ou senha incorretos.' })
        }
        res.json({ mensagem: 'Login realizado!', nome: results[0].nome })
    })
})

app.listen(3000, () => {
    console.log('🚀 Servidor rodando em http://localhost:3000')
})
