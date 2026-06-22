
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