import { Router } from "express";
import {
  listarOrdens,
  buscarOrdem,
  inserirOrdem,
  atualizarOrdem,
  excluirOrdem
} from "../controllers/ordensController.js";

const router = Router();

router.get("/", listarOrdens);
router.get("/:id", buscarOrdem);
router.post("/", inserirOrdem);
router.put("/:id", atualizarOrdem);
router.delete("/:id", excluirOrdem);

export default router;