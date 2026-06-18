import { Router } from "express";

import {

  listarServicosController,
  inserirServicoController,
  atualizarServicoController,
  excluirServicoController,

} from "../controllers/servicosController.js";

const router = Router();

router.get(
  "/",
  listarServicosController
);

router.post(
  "/",
  inserirServicoController
);

router.put(
  "/:id",
  atualizarServicoController
);

router.delete(
  "/:id",
  excluirServicoController
);

export default router;