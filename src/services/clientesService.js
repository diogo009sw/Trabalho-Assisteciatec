import * as repo from "../repositories/repositoryclientes.js";

export const listar = async () => {
  return await repo.listar();
};

export const inserir = async (dados) => {
  return await repo.inserir(dados);
};

export const excluir = async (id) => {
  return await repo.excluir(id);
};