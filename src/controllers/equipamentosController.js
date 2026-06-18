import * as service from "../services/equipamentosService.js";

export const listarEquipamentos = async (req, res) => {
  const dados = await service.listar();
  res.json(dados);
};

export const inserirEquipamento = async (req, res) => {
  const result = await service.inserir(req.body);
  res.json(result);
};

export const atualizarEquipamento = async (req, res) => {
  const result = await service.atualizar(req.params.id, req.body);
  res.json(result);
};

export const excluirEquipamento = async (req, res) => {
  const result = await service.excluir(req.params.id);
  res.json(result);
};