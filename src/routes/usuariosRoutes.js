import { Router } from "express";

import {
  listarUsuarios,
  buscarUsuario,
  inserirUsuario,
  atualizarUsuario,
  excluirUsuario,
  loginUsuario,
} from "../controllers/usuariosController.js";

const router = Router();

/* LOGIN */
router.post(
  "/login",
  loginUsuario
);

/* CRUD */
router.get(
  "/",
  listarUsuarios
);

router.get(
  "/:id",
  buscarUsuario
);

router.post(
  "/",
  inserirUsuario
);

router.put(
  "/:id",
  atualizarUsuario
);

router.delete(
  "/:id",
  excluirUsuario
);

export default router;