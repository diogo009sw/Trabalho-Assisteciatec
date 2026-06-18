import * as repository
from "../repositories/repositoryUsuarios.js";

import jwt from "jsonwebtoken";

/* =========================
   LISTAR
========================= */
export const listarUsuarios =
async (req, res) => {

  try {

    const usuarios =
      await repository.listar();

    res.json(usuarios);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      erro:
        "Erro ao listar usuários",
    });
  }
};

/* =========================
   BUSCAR
========================= */
export const buscarUsuario =
async (req, res) => {

  try {

    const usuario =
      await repository.buscar(
        req.params.id
      );

    res.json(usuario);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      erro:
        "Erro ao buscar usuário",
    });
  }
};

/* =========================
   INSERIR
========================= */
export const inserirUsuario =
async (req, res) => {

  try {

    const usuario =
      await repository.inserir(
        req.body
      );

    res.status(201).json(usuario);

  } catch (err) {

    console.error(err);

    /* EMAIL DUPLICADO */
    if (
      err.code ===
      "ER_DUP_ENTRY"
    ) {

      return res
        .status(400)
        .json({
          erro:
            "Email já cadastrado",
        });

    }

    res.status(500).json({
      erro:
        "Erro ao inserir usuário",
    });
  }
};

/* =========================
   ATUALIZAR
========================= */
export const atualizarUsuario =
async (req, res) => {

  try {

    const usuario =
      await repository.atualizar(
        req.params.id,
        req.body
      );

    res.json(usuario);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      erro:
        "Erro ao atualizar usuário",
    });
  }
};

/* =========================
   EXCLUIR
========================= */
export const excluirUsuario =
async (req, res) => {

  try {

    const resultado =
      await repository.excluir(
        req.params.id
      );

    res.json(resultado);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      erro:
        "Erro ao excluir usuário",
    });
  }
};

/* =========================
   LOGIN
========================= */
export const loginUsuario =
async (req, res) => {

  try {

    const {
      email,
      senha,
    } = req.body;

    const usuario =
      await repository.buscarPorEmailSenha(
        email,
        senha
      );

    if (!usuario) {

      return res
        .status(401)
        .json({
          erro:
            "Email ou senha inválidos",
        });

    }

    const token =
      jwt.sign(

        {
          id:
            usuario.id_usuario,

          email:
            usuario.email,
        },

        "segredo_super_secreto",

        {
          expiresIn: "1d",
        }

      );

    res.json({

      mensagem:
        "Login realizado",

      token,

      usuario,

    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      erro:
        "Erro no login",
    });
  }
};