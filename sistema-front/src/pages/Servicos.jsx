import React, { useEffect, useState } from "react";

function Servicos() {

  const [servicos, setServicos] =
    useState([]);

  const [ordens, setOrdens] =
    useState([]);

  const [pesquisa, setPesquisa] =
    useState("");

  const [editando, setEditando] =
    useState(null);

  const [form, setForm] = useState({

    id_ordem: "",
    descricao: "",
    valor: "",

  });

  useEffect(() => {

    carregarServicos();
    carregarOrdens();

  }, []);

  /* =========================
     LISTAR SERVIÇOS
  ========================= */
 async function carregarServicos() {

  try {

    const res = await fetch(
      "http://localhost:3000/servicos"
    );

    const data =
      await res.json();

    console.log(
      "SERVICOS:",
      data
    );

    setServicos(data);

  } catch (err) {

    console.error(err);

    alert(
      "Erro ao carregar serviços"
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
      descricao: "",
      valor: "",

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

        ? `http://localhost:3000/servicos/${editando}`

        : "http://localhost:3000/servicos";

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

      carregarServicos();

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
  function editar(servico) {

    setEditando(
      servico.id_servico
    );

    setForm({

      id_ordem:
        servico.id_ordem,

      descricao:
        servico.descricao,

      valor:
        servico.valor,

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

      `http://localhost:3000/servicos/${id}`,

      {
        method: "DELETE",
      }

    );

    carregarServicos();
  }

  /* =========================
     FILTRO PESQUISA
  ========================= */
  const servicosFiltrados =
    servicos.filter((servico) => {

      const texto =
        pesquisa.toLowerCase();

      return (

        servico.descricao
          ?.toLowerCase()
          .includes(texto)

        ||

        String(servico.id_servico)
          .includes(texto)

        ||

        String(servico.id_ordem)
          .includes(texto)

      );
    });

  return (

    <div style={styles.container}>

      <h1 style={styles.header}>
        Cadastro de Serviços
      </h1>

      {/* PESQUISA */}
      <input
        type="text"
        placeholder="Pesquisar serviço..."
        value={pesquisa}
        onChange={(e) =>
          setPesquisa(
            e.target.value
          )
        }
        style={styles.searchInput}
      />

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

                Ordem 
                {ordem.id_ordem}

              </option>

            ))}

          </select>

          <input
            type="text"
            name="descricao"
            placeholder="Descrição"
            value={form.descricao}
            onChange={handleChange}
            style={styles.input}
          />

        </div>

        <div style={styles.inputGroup}>

          <input
            type="number"
            name="valor"
            placeholder="Valor"
            value={form.valor}
            onChange={handleChange}
            style={styles.input}
          />

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

        {servicosFiltrados.map((servico) => (

          <div
            key={servico.id_servico}
            style={styles.card}
          >

            <h3>
              Serviço :
              {servico.id_servico}
            </h3>

            <p>
  <strong>Cliente:</strong>{" "}
  {servico.cliente}
</p>

<p>
  <strong>Ordem:</strong>{" "}
  #{servico.id_ordem}
</p>

<p>
  <strong>Equipamento:</strong>{" "}
  {servico.equipamento}
</p>

<p>
  <strong>Descrição:</strong>{" "}
  {servico.descricao}
</p>

<p>
  <strong>Valor:</strong>{" "}
  {Number(servico.valor).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  )}
</p>

            <div
              style={styles.cardButtons}
            >

              <button
                onClick={() =>
                  editar(servico)
                }
                style={styles.editButton}
              >

                Editar

              </button>

              <button
                onClick={() =>
                  excluir(
                    servico.id_servico
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
    fontSize: "16px",
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
  },

  deleteButton: {
    flex: 1,
    padding: "8px",
    background: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
  },

};

export default Servicos;