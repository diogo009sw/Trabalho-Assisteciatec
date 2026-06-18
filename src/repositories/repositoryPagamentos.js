import connection from "../database/connection.js";

async function listarPagamentos() {

  const comando = `
    SELECT * FROM pagamentos
    ORDER BY id_pagamento DESC
  `;

  const [linhas] =
    await connection.query(comando);

  return linhas;
}

async function inserirPagamento(pagamento) {

  const comando = `
    INSERT INTO pagamentos
    (id_ordem, valor,
     forma_pagamento,
     status_pagamento)

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

async function alterarPagamento(
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

async function deletarPagamento(id) {

  const comando = `
    DELETE FROM pagamentos
    WHERE id_pagamento = ?
  `;

  await connection.query(comando, [id]);
}

export {

  listarPagamentos,
  inserirPagamento,
  alterarPagamento,
  deletarPagamento,

};