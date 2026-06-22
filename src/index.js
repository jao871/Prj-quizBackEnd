import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3000, () => {
    console.log('🚀 Servidor rodando em http://localhost:3000')
})
