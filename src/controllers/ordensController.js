import * as service from "../services/ordensService.js";

export const listarOrdens = async (req, res) => {
  const dados = await service.listar();
  res.json(dados);
};

export const buscarOrdem = async (req, res) => {
  const dado = await service.buscar(req.params.id);
  res.json(dado);
};

export const inserirOrdem = async (req, res) => {
  const result = await service.inserir(req.body);
  res.json(result);
};

export const atualizarOrdem = async (req, res) => {
  const result = await service.atualizar(req.params.id, req.body);
  res.json(result);
};

export const excluirOrdem = async (req, res) => {
  const result = await service.excluir(req.params.id);
  res.json(result);
};