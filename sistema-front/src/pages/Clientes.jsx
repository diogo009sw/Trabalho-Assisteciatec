import { useEffect, useState } from "react";

function Clientes() {

  const [clientes, setClientes] =
    useState([]);

  const [clientesFiltrados,
    setClientesFiltrados] =
    useState([]);

  const [pesquisa, setPesquisa] =
    useState("");

  const [editandoId,
    setEditandoId] =
    useState(null);

  const [mostrarSenha,
    setMostrarSenha] =
    useState(false);

  const [form, setForm] =
    useState({

      nome: "",
      email: "",
      senha: "",

    });

  useEffect(() => {
    carregarClientes();
  }, []);

  /* =========================
     PESQUISA
  ========================= */
  useEffect(() => {

    const filtrados =
      clientes.filter((cliente) =>

        cliente.nome
          .toLowerCase()
          .includes(
            pesquisa.toLowerCase()
          ) ||

        cliente.email
          .toLowerCase()
          .includes(
            pesquisa.toLowerCase()
          )

      );

    setClientesFiltrados(
      filtrados
    );

  }, [pesquisa, clientes]);

  async function carregarClientes() {

    try {

      const res = await fetch(
        "http://localhost:3000/clientes"
      );

      const data =
        await res.json();

      setClientes(data);

    } catch (err) {

      console.error(err);

      alert(
        "Erro ao carregar clientes"
      );
    }
  }

  function handleChange(e) {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });
  }

  function limparFormulario() {

    setForm({

      nome: "",
      email: "",
      senha: "",

    });

    setEditandoId(null);
  }

  async function salvar() {

    if (
      !form.nome ||
      !form.email ||
      !form.senha
    ) {

      alert(
        "Preencha nome, email e senha"
      );

      return;
    }

    try {

      const url = editandoId

        ? `http://localhost:3000/clientes/${editandoId}`

        : "http://localhost:3000/clientes";

      const metodo =
        editandoId
          ? "PUT"
          : "POST";

      await fetch(url, {

        method: metodo,

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(form),

      });

      alert(

        editandoId
          ? "Atualizado!"
          : "Cadastrado!"

      );

      limparFormulario();

      carregarClientes();

    } catch (err) {

      console.error(err);

      alert("Erro ao salvar");
    }
  }

  /* =========================
     EDITAR
  ========================= */
  function editar(cliente) {

    console.log(cliente);

    setEditandoId(
      cliente.id || cliente.id_cliente
    );

    setForm({

      nome: cliente.nome,
      email: cliente.email,
      senha: cliente.senha,

    });
  }

  /* =========================
     EXCLUIR
  ========================= */
  async function excluir(id) {

    const confirmar =
      window.confirm(
        "Excluir cliente?"
      );

    if (!confirmar) return;

    try {

      await fetch(

        `http://localhost:3000/clientes/${id}`,

        {
          method: "DELETE",
        }

      );

      carregarClientes();

    } catch (err) {

      console.error(err);

      alert("Erro ao excluir");

    }
  }

  return (

    <div style={styles.container}>

      <h1 style={styles.title}>
        Clientes
      </h1>

      {/* PESQUISA */}
      <div style={styles.searchContainer}>

        <input
          type="text"
          placeholder="Pesquisar cliente..."
          value={pesquisa}
          onChange={(e) =>
            setPesquisa(
              e.target.value
            )
          }
          style={styles.searchInput}
        />

      </div>

      {/* FORM */}
      <div style={styles.formCard}>

        <h2>

          {editandoId

            ? "Editar Cliente"

            : "Cadastrar Cliente"}

        </h2>

        <div style={styles.inputGroup}>

          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />

        </div>

        {/* SENHA */}
        <div style={styles.inputGroup}>

          <div
            style={styles.senhaContainer}
          >

            <input
              type={
                mostrarSenha
                  ? "text"
                  : "password"
              }
              name="senha"
              placeholder="Senha"
              value={form.senha}
              onChange={handleChange}
              style={styles.inputSenha}
            />

            <span
              style={styles.olho}
              onClick={() =>
                setMostrarSenha(
                  !mostrarSenha
                )
              }
            >

              {mostrarSenha
                ? "🙈"
                : "👁️"}

            </span>

          </div>

        </div>

        <div style={styles.buttonGroup}>

          <button
            onClick={salvar}
            style={styles.saveButton}
          >

            {editandoId
              ? "Atualizar"
              : "Cadastrar"}

          </button>

          {editandoId && (

            <button
              onClick={
                limparFormulario
              }
              style={
                styles.cancelButton
              }
            >

              Cancelar

            </button>

          )}

        </div>

      </div>

      {/* LISTA */}
      <div style={styles.grid}>

        {clientesFiltrados.map((c) => (

          <div
            key={c.id || c.id_cliente}
            style={styles.card}
          >

            <h3>{c.nome}</h3>

            <p>

              <strong>Email:</strong>{" "}

              {c.email}

            </p>

            <p>

              <strong>Senha:</strong>{" "}

              ••••••••

            </p>

            <div
              style={styles.cardButtons}
            >

              <button
                onClick={() =>
                  editar(c)
                }
                style={
                  styles.editButton
                }
              >

                Editar

              </button>

              <button
                onClick={() =>
                  excluir(
                    c.id || c.id_cliente
                  )
                }
                style={
                  styles.deleteButton
                }
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

/* 🎨 ESTILOS */
const styles = {

  container: {
    padding: "30px",
    backgroundColor: "#f4f6f8",
    minHeight: "100vh",
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
  },

  searchContainer: {
    marginBottom: "20px",
  },

  searchInput: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },

  formCard: {
    backgroundColor: "#fff",
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

  senhaContainer: {
    position: "relative",
    width: "100%",
  },

  inputSenha: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  olho: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform:
      "translateY(-50%)",
    cursor: "pointer",
  },

  buttonGroup: {
    display: "flex",
    gap: "10px",
  },

  saveButton: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  cancelButton: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "15px",
  },

  card: {
    backgroundColor: "#fff",
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
    backgroundColor: "#ffc107",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  deleteButton: {
    flex: 1,
    padding: "8px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },

};

export default Clientes;