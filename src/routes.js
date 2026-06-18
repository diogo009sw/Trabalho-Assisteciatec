import { Router } from "express";

/* CLIENTES */
import {

  listarClientes,
  inserirCliente,
  atualizarCliente,
  excluirCliente,

} from "../controllers/clientesController.js";

/* EQUIPAMENTOS */
import {

  listarEquipamentos,
  inserirEquipamento,
  atualizarEquipamento,
  excluirEquipamento,

} from "../controllers/equipamentosController.js";

/* ORDENS */
import {

  listarOrdens,
  buscarOrdem,
  inserirOrdem,
  atualizarOrdem,
  excluirOrdem,

} from "../controllers/ordensController.js";

/* USUÁRIOS */
import {

  listarUsuarios,
  buscarUsuario,
  inserirUsuario,
  atualizarUsuario,
  excluirUsuario,

} from "../controllers/usuariosController.js";

/* SERVIÇOS */
import {

  listarServicos,
  inserirServico,
  atualizarServico,
  excluirServico,

} from "../controllers/servicosController.js";

/* PAGAMENTOS */
import {

  listarPagamentos,
  inserirPagamento,
  atualizarPagamento,
  excluirPagamento,

} from "../controllers/pagamentosController.js";

const router = Router();

/* =========================
   CLIENTES
========================= */

router.get(
  "/clientes",
  listarClientes
);

router.post(
  "/clientes",
  inserirCliente
);

router.put(
  "/clientes/:id",
  atualizarCliente
);

router.delete(
  "/clientes/:id",
  excluirCliente
);


/* =========================
   EQUIPAMENTOS
========================= */

router.get(
  "/equipamentos",
  listarEquipamentos
);

router.post(
  "/equipamentos",
  inserirEquipamento
);

router.put(
  "/equipamentos/:id",
  atualizarEquipamento
);

router.delete(
  "/equipamentos/:id",
  excluirEquipamento
);


/* =========================
   ORDENS
========================= */

router.get(
  "/ordens",
  listarOrdens
);

router.get(
  "/ordens/:id",
  buscarOrdem
);

router.post(
  "/ordens",
  inserirOrdem
);

router.put(
  "/ordens/:id",
  atualizarOrdem
);

router.delete(
  "/ordens/:id",
  excluirOrdem
);


/* =========================
   USUÁRIOS
========================= */

router.get(
  "/usuarios",
  listarUsuarios
);

router.get(
  "/usuarios/:id",
  buscarUsuario
);

router.post(
  "/usuarios",
  inserirUsuario
);

router.put(
  "/usuarios/:id",
  atualizarUsuario
);

router.delete(
  "/usuarios/:id",
  excluirUsuario
);


/* =========================
   SERVIÇOS
========================= */

router.get(
  "/servicos",
  listarServicos
);

router.post(
  "/servicos",
  inserirServico
);

router.put(
  "/servicos/:id",
  atualizarServico
);

router.delete(
  "/servicos/:id",
  excluirServico
);


/* =========================
   PAGAMENTOS
========================= */

router.get(
  "/pagamentos",
  listarPagamentos
);

router.post(
  "/pagamentos",
  inserirPagamento
);

router.put(
  "/pagamentos/:id",
  atualizarPagamento
);

router.delete(
  "/pagamentos/:id",
  excluirPagamento
);

export default router;