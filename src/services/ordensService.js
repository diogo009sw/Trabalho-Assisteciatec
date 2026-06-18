import * as repo from "../repositories/repositoryordens.js";

export const listar = () => repo.listar();
export const buscar = (id) => repo.buscar(id);
export const inserir = (dados) => repo.inserir(dados);
export const atualizar = (id, dados) => repo.atualizar(id, dados);
export const excluir = (id) => repo.excluir(id);