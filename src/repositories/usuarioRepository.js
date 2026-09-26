import pool from '../config/Database.js'
import usuario from '../models/usuario.js'

class usuarioRepository{
    //salva o usuario no banco de dados 
    async salvar (usuario){
        const sql = 'INSERT INTO usuario (email,senha_hash) VALUES(?,?)';
        const [resultado] = await pool.execute(sql, [usuario.email,usuario.senha_hash])
    return resultado.insertId
    }
    //busca o usuario por id 
    async buscarPorId(idusuario){
        const sql = ' SELECT * FROM usuario WHERE idusuario = ?';
        const [linhas] = await pool.execute(sql,[idusuario])
        if (linhas.length === 0) return null
        const dados = linhas[0]
        return new usuario(dados.idusuario, dados.email, dados.senha_hash)
    }

    //buscar por email
    async buscarPorEmail(email){
        const sql = 'SELECT * FROM usuario WHERE email = ?';
        const [linhas] = await pool.execute(sql,[email])
        if (linhas.length ===0) return null
        const dados = linhas[0]

        return new usuario (dados.idusuario, dados.email, dados.senha_hash)
    }
    //atualizar o usuario
    async atualizar (usuario){
        const sql = 'UPDATE usuario SET email = ?, senha_hash = ? WHERE idusuario =?'
        const [resultado] = await pool.execute(sql,[usuario.email,usuario.senha_hash,usuario.idusuario])
        return resultado.affectedRows > 0
    }
}
 export default new usuarioRepository()