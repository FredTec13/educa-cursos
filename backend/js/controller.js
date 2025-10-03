const { conectar, desconectar } = require('./db');
const { encrypt, compare_encrypt } = require('./encrypt')

async function criarTabelas() {
    const conexao = await conectar();

    let query = `
    CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    senha VARCHAR(200) NOT NULL
    )`

    await conexao.execute(query);
    await desconectar(conexao);
}

async function inserir_usuario(usuario) {
    const conn = await conectar();
    let query = `
    INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`;
    var senha_criptografada = await encrypt(usuario.senha)
    let parametros = [
        usuario.nome,
        usuario.email,
        senha_criptografada
    ];
    await conn.execute(query, parametros);
    await desconectar(conn);
}

async function excluir_usuario(email) {
    const conn = await conectar();

    var query = "DELETE FROM usuarios WHERE email = ?"
    var param = [email];

    await conn.execute(query, param);
    await desconectar(conn);
}

async function buscar_usuario_por_email(user) {
    try {
        const conn = await conectar();
        let query = `
            SELECT * FROM usuarios WHERE email = ?
        `
        let param = [user.email];
        var [usuario] = await conn.execute(query, param);
        
        await desconectar(conn)

        return await compare_encrypt(user.senha, usuario[0].senha)
    } catch (err) {
        console.error('Erro:', err.message);
    }
}

module.exports = { inserir_usuario, excluir_usuario, buscar_usuario_por_email, criarTabelas }
