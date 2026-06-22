
app.post('/cadastro', (req, res) => {
    const { nome, email, senha, estado, dataNasc } = req.body

    if (!nome || !email || !senha || !estado || !dataNasc) {
        return res.status(400).json({ erro: 'Preencha todos os campos.' })
    }

    const sql = 'INSERT INTO usuarios (nome, email, senha, estado, dataNasc) VALUES (?, ?, ?)'
    db.query(sql, [nome, email, senha, estado, dataNasc], (err) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ erro: 'E-mail já cadastrado.' })
            }
            return res.status(500).json({ erro: 'Erro ao cadastrar.' })
        }
        res.status(201).json({ mensagem: 'Cadastro realizado com sucesso!' })
    })
})