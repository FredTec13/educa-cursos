const express = require('express');
const cors = require('cors');

const { inserir_usuario, excluir_usuario, buscar_usuario_por_email, criarTabelas } = require('./controller');

const app = express();

app.use(cors());
app.use(express.json());

criarTabelas()

app.post('/cadastrar', async (req, res) => {
    try {
        const novo_usuario = req.body;
        await inserir_usuario(novo_usuario);
        res.status(201).send({ mensagem: 'Usuário criado com sucesso!'});
    } catch (err) {
        res.status(500).send({ erro: err.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const user = req.body;
        usuario = await buscar_usuario_por_email(user);
        if (usuario){
            res.status(200).send({ mensagem: `Login efetuado com sucesso!`});
        } else {
            res.status(401).send({ mensagem: `Login falhou, verifique sua senha e email!`});
        }

    } catch (err) {
        res.status(500).send({ erro: err.message });
    }
})

app.delete('/delete/:email', async (req, res) => {
    try {
        const {email} = req.params;
        await excluir_usuario(email);
        res.status(200).send({ mensagem: 'Usuário excluido com sucesso!'});
    } catch (erro) {
        res.status(500).send({ erro: err.message });
    }
})


app.listen(5000, () => {
    console.log("Servidor rodando em http://localhost:5000");
})