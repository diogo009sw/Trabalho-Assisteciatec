import { Router } from "express";

import {

  listarPagamentosController,
  inserirPagamentoController,
  atualizarPagamentoController,
  excluirPagamentoController,

} from "../controllers/pagamentosController.js";

const router = Router();

router.get(
  "/",
  listarPagamentosController
);

router.post(
  "/",
  inserirPagamentoController
);

router.put(
  "/:id",
  atualizarPagamentoController
);

router.delete(
  "/:id",
  excluirPagamentoController
);

export default router;