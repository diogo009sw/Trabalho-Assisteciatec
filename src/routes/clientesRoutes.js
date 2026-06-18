import { Router } from "express";
import {
  listarClientes,
  inserirCliente,
  excluirCliente
} from "../controllers/clientesController.js";

const router = Router();

router.get("/", listarClientes);
router.post("/", inserirCliente);
router.delete("/:id", excluirCliente);

export default router;