import {

  listarPagamentos,
  inserirPagamento,
  atualizarPagamento,
  excluirPagamento,

} from "../services/pagamentosService.js";


async function listarPagamentosController(
  req,
  res
) {

  const dados =
    await listarPagamentos();

  res.json(dados);
}


async function inserirPagamentoController(
  req,
  res
) {

  const id =
    await inserirPagamento(req.body);

  res.json({ id });
}


async function atualizarPagamentoController(
  req,
  res
) {

  await atualizarPagamento(
    req.params.id,
    req.body
  );

  res.json({

    mensagem:
      "Pagamento atualizado"

  });
}


async function excluirPagamentoController(
  req,
  res
) {

  await excluirPagamento(
    req.params.id
  );

  res.json({

    mensagem:
      "Pagamento excluído"

  });
}


export {

  listarPagamentosController,
  inserirPagamentoController,
  atualizarPagamentoController,
  excluirPagamentoController,

};