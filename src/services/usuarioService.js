import bcrypt from "bcryptjs";
import usuarioRepository from "../repositories/usuarioRepository.js";
import usuario from "../models/usuario.js";

class usuarioService{
    async cadastrar(email, senha) {
        const usuarioExistente = await usuarioRepository.buscarPorEmail(email)
        if (usuarioExistente){
            throw new Error ("este email ja esta em uso.")
        }

        const salt = await bcrypt.genSalt(10)
        const senhaHash = await bcrypt.hash(senha, salt)

        const novoUsuario = new usuario (null,senhaHash,email)


        const idGerado = await usuarioRepository.salvar(novoUsuario)
        novoUsuario.idusuario = idGerado
        return novoUsuario
    }

    async autenticar(email,senha){
        const usuario = await usuarioRepository.buscarPorEmail(email)
        if(!usuario){
            throw new Error ("Email ou senha incorretos.")

        }
        const senhaValida = await bcrypt.compare(senha, usuario.senha_hash )
        if(!senhaValida){
            throw new Error("Email ou senha incorretos.")
        }
        return usuario
    }
}
