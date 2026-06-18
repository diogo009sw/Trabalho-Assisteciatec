import connection from "../database/connection.js";

export async function listarServicos() {

  const comando = `
    SELECT
      s.id_servico,
      s.id_ordem,
      s.descricao,
      s.valor,
      s.data_servico,

      c.nome AS cliente,

      CONCAT(
        e.tipo,
        ' ',
        e.marca,
        ' ',
        e.modelo
      ) AS equipamento

    FROM servicos s

    LEFT JOIN ordens o
      ON s.id_ordem = o.id_ordem

    LEFT JOIN clientes c
      ON o.id_cliente = c.id_cliente

    LEFT JOIN equipamentos e
      ON o.id_equipamento = e.id_equipamento

    ORDER BY s.id_servico DESC
  `;

  const [linhas] =
    await connection.query(comando);

  return linhas;
}

export async function inserirServico(
  servico
) {

  const comando = `
    INSERT INTO servicos
    (id_ordem, descricao, valor)
    VALUES (?, ?, ?)
  `;

  const [resultado] =
    await connection.query(comando, [

      servico.id_ordem,
      servico.descricao,
      servico.valor,

    ]);

  return resultado.insertId;
}

export async function atualizarServico(
  id,
  servico
) {

  const comando = `
    UPDATE servicos
    SET
      id_ordem = ?,
      descricao = ?,
      valor = ?
    WHERE id_servico = ?
  `;

  await connection.query(comando, [

    servico.id_ordem,
    servico.descricao,
    servico.valor,
    id,

  ]);
}

export async function excluirServico(id) {

  const comando = `
    DELETE FROM servicos
    WHERE id_servico = ?
  `;

  await connection.query(comando, [id]);
}