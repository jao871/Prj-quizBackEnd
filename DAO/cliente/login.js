
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