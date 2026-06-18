import db from "../database/connection.js";

/* =========================
   📄 LISTAR
========================= */
export const listar = async () => {

  const [rows] = await db.query(`
    SELECT 
      o.id_ordem,
      o.id_cliente,
      o.id_equipamento,
      o.descricao_problema,
      o.status,

      c.nome AS cliente,

      e.tipo AS equipamento

    FROM ordens o

    JOIN clientes c
      ON o.id_cliente = c.id_cliente

    JOIN equipamentos e
      ON o.id_equipamento = e.id_equipamento
  `);

  return rows;
};

/* =========================
   🔍 BUSCAR
========================= */
export const buscar = async (id) => {

  const [rows] = await db.query(
    `
    SELECT 
      o.id_ordem,
      o.id_cliente,
      o.id_equipamento,
      o.descricao_problema,
      o.status,

      c.nome AS cliente,

      e.tipo AS equipamento

    FROM ordens o

    JOIN clientes c
      ON o.id_cliente = c.id_cliente

    JOIN equipamentos e
      ON o.id_equipamento = e.id_equipamento

    WHERE o.id_ordem = ?
    `,
    [id]
  );

  return rows[0];
};

/* =========================
   ➕ INSERIR
========================= */
export const inserir = async (dados) => {

  const {
    id_cliente,
    id_equipamento,
    descricao_problema,
    status,
  } = dados;

  const [result] = await db.query(
    `
    INSERT INTO ordens
    (
      id_cliente,
      id_equipamento,
      descricao_problema,
      status
    )
    VALUES (?, ?, ?, ?)
    `,
    [
      id_cliente,
      id_equipamento,
      descricao_problema,
      status,
    ]
  );

  return {
    id_ordem: result.insertId,
    ...dados,
  };
};

/* =========================
   ✏️ ATUALIZAR
========================= */
export const atualizar = async (id, dados) => {

  const {
    id_cliente,
    id_equipamento,
    descricao_problema,
    status,
  } = dados;

  await db.query(
    `
    UPDATE ordens
    SET
      id_cliente = ?,
      id_equipamento = ?,
      descricao_problema = ?,
      status = ?
    WHERE id_ordem = ?
    `,
    [
      id_cliente,
      id_equipamento,
      descricao_problema,
      status,
      id,
    ]
  );

  return {
    id_ordem: id,
    ...dados,
  };
};

/* =========================
   ❌ EXCLUIR
========================= */
export const excluir = async (id) => {

  await db.query(
    `
    DELETE FROM ordens
    WHERE id_ordem = ?
    `,
    [id]
  );

  return {
    mensagem: "Ordem excluída com sucesso",
  };
};