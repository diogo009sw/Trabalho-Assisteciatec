import db from "../database/connection.js";

/* =========================
   📄 LISTAR
========================= */
export const listar = async () => {

  const [rows] = await db.query(`
    SELECT 
      id_equipamento,
      tipo,
      marca,
      modelo,
      numero_serie
    FROM equipamentos
  `);

  return rows;
};

/* =========================
   ➕ INSERIR
========================= */
export const inserir = async ({
  tipo,
  marca,
  modelo,
  numero_serie,
}) => {

  const [result] = await db.query(
    `
    INSERT INTO equipamentos
    (
      tipo,
      marca,
      modelo,
      numero_serie
    )
    VALUES (?, ?, ?, ?)
    `,
    [
      tipo,
      marca,
      modelo,
      numero_serie,
    ]
  );

  return {
    id_equipamento: result.insertId,
    tipo,
    marca,
    modelo,
    numero_serie,
  };
};

/* =========================
   ✏️ ATUALIZAR
========================= */
export const atualizar = async (id, dados) => {

  const {
    tipo,
    marca,
    modelo,
    numero_serie,
  } = dados;

  await db.query(
    `
    UPDATE equipamentos
    SET
      tipo = ?,
      marca = ?,
      modelo = ?,
      numero_serie = ?
    WHERE id_equipamento = ?
    `,
    [
      tipo,
      marca,
      modelo,
      numero_serie,
      id,
    ]
  );

  return {
    id_equipamento: id,
    ...dados,
  };
};

/* =========================
   ❌ EXCLUIR
========================= */
export const excluir = async (id) => {

  await db.query(
    `
    DELETE FROM equipamentos
    WHERE id_equipamento = ?
    `,
    [id]
  );

  return {
    mensagem: "Equipamento deletado",
  };
};