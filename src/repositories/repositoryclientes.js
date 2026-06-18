import db from "../database/connection.js";

/* =========================
   📄 LISTAR
========================= */
export const listar = async () => {
  const [rows] = await db.query("SELECT * FROM clientes");
  return rows;
};

/* =========================
   ➕ INSERIR (AJUSTADO)
========================= */
export const inserir = async (dados) => {
  const { nome, email } = dados;

  const [result] = await db.query(
    "INSERT INTO clientes (nome, email) VALUES (?, ?)",
    [nome, email]
  );

  return { id: result.insertId, nome, email };
};

/* =========================
   ❌ EXCLUIR (CORRIGIDO)
========================= */
export const excluir = async (id) => {
  await db.query("DELETE FROM clientes WHERE id_cliente = ?", [id]);
  return { mensagem: "Cliente deletado" };
};