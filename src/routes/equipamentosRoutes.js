import { Router } from "express";
import {
  listarEquipamentos,
  inserirEquipamento,
  atualizarEquipamento,
  excluirEquipamento
} from "../controllers/equipamentosController.js";

const router = Router();

router.get("/", listarEquipamentos);
router.post("/", inserirEquipamento);
router.put("/:id", atualizarEquipamento);
router.delete("/:id", excluirEquipamento);

export default router;