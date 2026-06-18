import React, { useEffect, useState } from "react";

function Pagamentos() {

  const [filtroStatus,
  setFiltroStatus] =
  useState("Todos");

  const [pagamentos, setPagamentos] =
    useState([]);

  const [ordens, setOrdens] =
    useState([]);

  const [pesquisa, setPesquisa] =
    useState("");

  const [editando, setEditando] =
    useState(null);

  const [form, setForm] = useState({

    id_ordem: "",
    valor: "",
    forma_pagamento: "",
    status_pagamento:
      "Pendente",

  });

  useEffect(() => {

    carregarPagamentos();
    carregarOrdens();

  }, []);

  /* =========================
     LISTAR PAGAMENTOS
  ========================= */
  async function carregarPagamentos() {

    try {

      const res = await fetch(
        "http://localhost:3000/pagamentos"
      );

      const data =
        await res.json();

      setPagamentos(data);

    } catch (err) {

      console.error(err);

      alert(
        "Erro ao carregar pagamentos"
      );
    }
  }

  /* =========================
     LISTAR ORDENS
  ========================= */
  async function carregarOrdens() {

    try {

      const res = await fetch(
        "http://localhost:3000/ordens"
      );

      const data =
        await res.json();

      setOrdens(data);

    } catch (err) {

      console.error(err);
    }
  }

  /* =========================
     INPUTS
  ========================= */
  function handleChange(e) {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });
  }

  /* =========================
     LIMPAR
  ========================= */
  function limparFormulario() {

    setForm({

      id_ordem: "",
      valor: "",
      forma_pagamento: "",
      status_pagamento:
        "Pendente",

    });

    setEditando(null);
  }

  /* =========================
     SALVAR
  ========================= */
  async function salvar(e) {

    e.preventDefault();

    try {

      const url = editando

        ? `http://localhost:3000/pagamentos/${editando}`

        : "http://localhost:3000/pagamentos";

      const metodo =
        editando ? "PUT" : "POST";

      await fetch(url, {

        method: metodo,

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(form),

      });

      limparFormulario();

      carregarPagamentos();

    } catch (err) {

      console.error(err);

      alert(
        "Erro ao salvar"
      );
    }
  }

  /* =========================
     EDITAR
  ========================= */
  function editar(pagamento) {

    setEditando(
      pagamento.id_pagamento
    );

    setForm({

      id_ordem:
        pagamento.id_ordem,

      valor:
        pagamento.valor,

      forma_pagamento:
        pagamento.forma_pagamento,

      status_pagamento:
        pagamento.status_pagamento,

    });
  }

  /* =========================
     EXCLUIR
  ========================= */
  async function excluir(id) {

    const confirmar =
      window.confirm(
        "Deseja excluir?"
      );

    if (!confirmar) return;

    await fetch(

      `http://localhost:3000/pagamentos/${id}`,

      {
        method: "DELETE",
      }

    );

    carregarPagamentos();
  }

  /* =========================
     FILTRO PESQUISA
  ========================= */
  const pagamentosFiltrados =
  pagamentos.filter((pagamento) => {

    const texto =
      pesquisa.toLowerCase();

    const pesquisaOk =

      pagamento.id_pagamento
        ?.toString()
        .includes(texto) ||

      pagamento.id_ordem
        ?.toString()
        .includes(texto) ||

      pagamento.forma_pagamento
        ?.toLowerCase()
        .includes(texto) ||

      pagamento.status_pagamento
        ?.toLowerCase()
        .includes(texto);

    const statusOk =
      filtroStatus === "Todos"
        ? true
        : pagamento.status_pagamento ===
          filtroStatus;

    return (
      pesquisaOk &&
      statusOk
    );
  });

  return (

    <div style={styles.container}>

      <h1 style={styles.header}>
        Cadastro de Pagamentos
      </h1>

      {/* PESQUISA */}
      <input
        type="text"
        placeholder="Pesquisar pagamento..."
        value={pesquisa}
        onChange={(e) =>
          setPesquisa(e.target.value)
        }
        style={styles.searchInput}
      />

      <select
  value={filtroStatus}
  onChange={(e) =>
    setFiltroStatus(
      e.target.value
    )
  }
  style={styles.searchInput}
>
  <option value="Todos">
    Todos os Status
  </option>

  <option value="Pendente">
    Apenas Pendentes
  </option>

  <option value="Pago">
    Apenas Pagos
  </option>

  <option value="Cancelado">
    Apenas Cancelados
  </option>
</select>

      <form
        onSubmit={salvar}
        style={styles.formCard}
      >

        <div style={styles.inputGroup}>

          {/* SELECT ORDEM */}
          <select
            name="id_ordem"
            value={form.id_ordem}
            onChange={handleChange}
            style={styles.input}
          >

            <option value="">
              Selecione a Ordem
            </option>

            {ordens.map((ordem) => (

              <option
                key={ordem.id_ordem}
                value={ordem.id_ordem}
              >

                Ordem #
                {ordem.id_ordem}

              </option>

            ))}

          </select>

          <input
            type="number"
            name="valor"
            placeholder="Valor"
            value={form.valor}
            onChange={handleChange}
            style={styles.input}
          />

        </div>

        <div style={styles.inputGroup}>

          <input
            type="text"
            name="forma_pagamento"
            placeholder="Forma Pagamento"
            value={form.forma_pagamento}
            onChange={handleChange}
            style={styles.input}
          />

          <select
            name="status_pagamento"
            value={
              form.status_pagamento
            }
            onChange={handleChange}
            style={styles.input}
          >

            <option value="Pendente">
              Pendente
            </option>

            <option value="Pago">
              Pago
            </option>

            <option value="Cancelado">
              Cancelado
            </option>

          </select>

        </div>

        <div style={styles.buttonGroup}>

          <button
            type="submit"
            style={styles.button}
          >

            {editando
              ? "Atualizar"
              : "Cadastrar"}

          </button>

        </div>

      </form>

      <div style={styles.list}>

        {pagamentosFiltrados.map((pagamento) => (

          <div
            key={pagamento.id_pagamento}
            style={styles.card}
          >

            <h3>
              Pagamento #
              {
                pagamento.id_pagamento
              }
            </h3>

            <p>

              <strong>Ordem:</strong>{" "}

              {
                pagamento.id_ordem
              }

            </p>

            <p>

              <strong>Valor:</strong>{" "}

              R$ {pagamento.valor}

            </p>

            <p>

              <strong>Forma:</strong>{" "}

              {
                pagamento.forma_pagamento
              }

            </p>

            <p>

              <strong>Status:</strong>{" "}

              {
                pagamento.status_pagamento
              }

            </p>

            <div
              style={styles.cardButtons}
            >

              <button
                onClick={() =>
                  editar(
                    pagamento
                  )
                }
                style={styles.editButton}
              >

                Editar

              </button>

              <button
                onClick={() =>
                  excluir(
                    pagamento.id_pagamento
                  )
                }
                style={styles.deleteButton}
              >

                Excluir

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

const styles = {

  container: {
    padding: "30px",
    fontFamily: "Arial",
    background: "#f4f6f8",
    minHeight: "100vh",
  },

  header: {
    textAlign: "center",
    marginBottom: "20px",
  },

  searchInput: {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },

  formCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow:
      "0 4px 10px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },

  inputGroup: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  buttonGroup: {
    display: "flex",
    gap: "10px",
  },

  button: {
    flex: 1,
    padding: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  list: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "15px",
  },

  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.1)",
  },

  cardButtons: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  editButton: {
    flex: 1,
    padding: "8px",
    background: "#ffc107",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  deleteButton: {
    flex: 1,
    padding: "8px",
    background: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },

};

export default Pagamentos;