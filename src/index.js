import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// ROTAS
import clientesRoutes
from "./routes/clientesRoutes.js";

import equipamentosRoutes
from "./routes/equipamentosRoutes.js";

import ordensRoutes
from "./routes/ordensRoutes.js";

import usuariosRoutes
from "./routes/usuariosRoutes.js";

import servicosRoutes
from "./routes/servicosRoutes.js";

import pagamentosRoutes
from "./routes/pagamentosRoutes.js";

dotenv.config();
console.log(process.env);
console.log(
  "JWT:",
  process.env.JWT_SECRET
);

const app = express();

/* =======================
   MIDDLEWARES
======================= */

app.use(cors());

app.use(express.json());

/* =======================
   ROTAS API
======================= */

app.use(
  "/clientes",
  clientesRoutes
);

app.use(
  "/equipamentos",
  equipamentosRoutes
);

app.use(
  "/ordens",
  ordensRoutes
);

app.use(
  "/usuarios",
  usuariosRoutes
);

app.use(
  "/servicos",
  servicosRoutes
);

app.use(
  "/pagamentos",
  pagamentosRoutes
);

/* =======================
   ROTA BASE
======================= */

app.get("/", (req, res) => {

  res.json({

    mensagem:
      "API funcionando 🚀",

    rotas: [

      // CLIENTES
      "GET /clientes",
      "POST /clientes",
      "PUT /clientes/:id",
      "DELETE /clientes/:id",

      // EQUIPAMENTOS
      "GET /equipamentos",
      "POST /equipamentos",
      "PUT /equipamentos/:id",
      "DELETE /equipamentos/:id",

      // ORDENS
      "GET /ordens",
      "GET /ordens/:id",
      "POST /ordens",
      "PUT /ordens/:id",
      "DELETE /ordens/:id",

      // USUÁRIOS
      "GET /usuarios",
      "GET /usuarios/:id",
      "POST /usuarios",
      "PUT /usuarios/:id",
      "DELETE /usuarios/:id",

      // SERVIÇOS
      "GET /servicos",
      "POST /servicos",
      "PUT /servicos/:id",
      "DELETE /servicos/:id",

      // PAGAMENTOS
      "GET /pagamentos",
      "POST /pagamentos",
      "PUT /pagamentos/:id",
      "DELETE /pagamentos/:id",

    ],

  });
});

/* =======================
   ROTA NÃO ENCONTRADA
======================= */

app.use((req, res) => {

  res.status(404).json({

    erro:
      "Rota não encontrada",

  });
});

/* =======================
   SERVIDOR
======================= */

const PORT =
  process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(

    `Servidor rodando em:
     http://localhost:${PORT}`

  );

});