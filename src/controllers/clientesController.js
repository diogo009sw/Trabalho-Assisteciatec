import * as service from "../services/clientesService.js";

export const listarClientes = async (req, res) => {
  const dados = await service.listar();
  res.json(dados);
};

export const inserirCliente = async (req, res) => {
  const result = await service.inserir(req.body);
  res.json(result);
};

export const excluirCliente = async (req, res) => {
  const result = await service.excluir(req.params.id);
  res.json(result);
};