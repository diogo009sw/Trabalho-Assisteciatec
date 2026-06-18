import {

  listarServicos,
  inserirServico,
  atualizarServico,
  excluirServico,

} from "../services/servicosService.js";


async function listarServicosController(
  req,
  res
) {

  const dados =
    await listarServicos();

  res.json(dados);
}


async function inserirServicoController(
  req,
  res
) {

  const id =
    await inserirServico(req.body);

  res.json({ id });
}


async function atualizarServicoController(
  req,
  res
) {

  await atualizarServico(
    req.params.id,
    req.body
  );

  res.json({

    mensagem:
      "Serviço atualizado"

  });
}


async function excluirServicoController(
  req,
  res
) {

  await excluirServico(
    req.params.id
  );

  res.json({

    mensagem:
      "Serviço excluído"

  });
}


export {

  listarServicosController,
  inserirServicoController,
  atualizarServicoController,
  excluirServicoController,

};