import db from "../database/connection.js";

/* =========================
   LISTAR
========================= */
export const listar = async () => {

  const [rows] = await db.query(`
    SELECT
      id_usuario,
      nome,
      email
    FROM usuarios
  `);

  return rows;
};

/* =========================
   BUSCAR
========================= */
export const buscar = async (id) => {

  const [rows] = await db.query(
    `
    SELECT
      id_usuario,
      nome,
      email
    FROM usuarios
    WHERE id_usuario = ?
    `,
    [id]
  );

  return rows[0];
};

/* =========================
   INSERIR
========================= */
export const inserir = async ({
  nome,
  email,
  senha,
}) => {

  const [result] = await db.query(
    `
    INSERT INTO usuarios
    (
      nome,
      email,
      senha
    )
    VALUES (?, ?, ?)
    `,
    [
      nome,
      email,
      senha,
    ]
  );

  return {
    id_usuario: result.insertId,
    nome,
    email,
  };
};

/* =========================
   ATUALIZAR
========================= */
export const atualizar = async (id, dados) => {

  const {
    nome,
    email,
    senha,
  } = dados;

  await db.query(
    `
    UPDATE usuarios
    SET
      nome = ?,
      email = ?,
      senha = ?
    WHERE id_usuario = ?
    `,
    [
      nome,
      email,
      senha,
      id,
    ]
  );

  return {
    id_usuario: id,
    ...dados,
  };
};

/* =========================
   EXCLUIR
========================= */
export const excluir = async (id) => {

  await db.query(
    `
    DELETE FROM usuarios
    WHERE id_usuario = ?
    `,
    [id]
  );

  return {
    mensagem: "Usuário excluído",
  };
};
/* =========================
   LOGIN
========================= */
export const buscarPorEmailSenha =
async (email, senha) => {

  const [rows] = await db.query(

    `
    SELECT
      id_usuario,
      nome,
      email
    FROM usuarios
    WHERE email = ?
    AND senha = ?
    `,

    [email, senha]

  );

  return rows[0];
};