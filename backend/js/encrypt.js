const bcrypt = require("bcrypt");

async function encrypt(senha) { //criptografar
    const hash = await bcrypt.hash(senha, 11);
    return hash;
}

async function compare_encrypt(senha, hash){
    const senhaCorreta = await bcrypt.compare(senha, hash);
    return senhaCorreta;
}

//compare_encrypt()    
// encrypt()
module.exports = {encrypt, compare_encrypt}