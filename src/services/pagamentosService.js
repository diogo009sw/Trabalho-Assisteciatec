import connection from "../database/connection.js";

export async function listarPagamentos() {

  const comando = `
    SELECT * FROM pagamentos
    ORDER BY id_pagamento DESC
  `;

  const [linhas] =
    await connection.query(comando);

  return linhas;
}

export async function inserirPagamento(
  pagamento
) {

  const comando = `
    INSERT INTO pagamentos
    (
      id_ordem,
      valor,
      forma_pagamento,
      status_pagamento
    )

    VALUES (?, ?, ?, ?)
  `;

  const [resultado] =
    await connection.query(comando, [

      pagamento.id_ordem,
      pagamento.valor,
      pagamento.forma_pagamento,
      pagamento.status_pagamento,

    ]);

  return resultado.insertId;
}

export async function atualizarPagamento(
  id,
  pagamento
) {

  const comando = `
    UPDATE pagamentos
    SET
      id_ordem = ?,
      valor = ?,
      forma_pagamento = ?,
      status_pagamento = ?
    WHERE id_pagamento = ?
  `;

  await connection.query(comando, [

    pagamento.id_ordem,
    pagamento.valor,
    pagamento.forma_pagamento,
    pagamento.status_pagamento,
    id,

  ]);
}

export async function excluirPagamento(id) {

  const comando = `
    DELETE FROM pagamentos
    WHERE id_pagamento = ?
  `;

  await connection.query(comando, [id]);
}