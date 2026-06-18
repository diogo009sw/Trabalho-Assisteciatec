import * as repository from "../repositories/repositoryUsuarios.js";

export const listar = () => repository.listar();

export const buscar = (id) => repository.buscar(id);

export const inserir = (dados) => repository.inserir(dados);

export const atualizar = (id, dados) =>
  repository.atualizar(id, dados);

export const excluir = (id) =>
  repository.excluir(id);