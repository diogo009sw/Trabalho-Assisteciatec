import React, {
  useEffect,
  useState,
} from "react";

function Usuarios() {

  const [usuarios, setUsuarios] =
    useState([]);

  const [usuariosFiltrados,
    setUsuariosFiltrados] =
    useState([]);

  const [pesquisa,
    setPesquisa] =
    useState("");

  const [editando, setEditando] =
    useState(null);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  useEffect(() => {
    carregarUsuarios();
  }, []);

  /* =========================
     PESQUISA
  ========================= */
  useEffect(() => {

    const filtrados =
      usuarios.filter((usuario) =>

        usuario.nome
          ?.toLowerCase()
          .includes(
            pesquisa.toLowerCase()
          ) ||

        usuario.email
          ?.toLowerCase()
          .includes(
            pesquisa.toLowerCase()
          )

      );

    setUsuariosFiltrados(
      filtrados
    );

  }, [pesquisa, usuarios]);

  /* =========================
     LISTAR
  ========================= */
  async function carregarUsuarios() {

    try {

      const res = await fetch(
        "http://localhost:3000/usuarios"
      );

      const data = await res.json();

      setUsuarios(data);

    } catch (err) {

      console.error(err);

      alert(
        "Erro ao carregar usuários"
      );
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
      nome: "",
      email: "",
      senha: "",
    });

    setEditando(null);
  }

  /* =========================
     SALVAR
  ========================= */
  async function salvar(e) {

    e.preventDefault();

    if (
      !form.nome ||
      !form.email ||
      !form.senha
    ) {
      alert(
        "Preencha todos os campos"
      );

      return;
    }

    try {

      const url = editando
        ? `http://localhost:3000/usuarios/${editando}`
        : "http://localhost:3000/usuarios";

      const metodo = editando
        ? "PUT"
        : "POST";

      const res = await fetch(url, {
        method: metodo,

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error
        );
      }

      alert(
        editando
          ? "Usuário atualizado!"
          : "Usuário cadastrado!"
      );

      limparFormulario();

      carregarUsuarios();

    } catch (err) {

      console.error(err);

      alert(
        "Erro ao salvar usuário"
      );
    }
  }

  /* =========================
     EDITAR
  ========================= */
  function editar(usuario) {

    setEditando(
      usuario.id_usuario
    );

    setForm({
      nome: usuario.nome,
      email: usuario.email,
      senha: "",
    });
  }

  /* =========================
     EXCLUIR
  ========================= */
  async function excluir(id) {

    const confirmar =
      window.confirm(
        "Deseja excluir este usuário?"
      );

    if (!confirmar) return;

    try {

      await fetch(
        `http://localhost:3000/usuarios/${id}`,
        {
          method: "DELETE",
        }
      );

      alert("Usuário excluído!");

      carregarUsuarios();

    } catch (err) {

      console.error(err);

      alert(
        "Erro ao excluir usuário"
      );
    }
  }

  return (

    <div style={styles.container}>

      <h1 style={styles.header}>
        Cadastro de Usuários
      </h1>

      {/* PESQUISA */}
      <div style={styles.searchContainer}>

        <input
          type="text"
          placeholder="Pesquisar usuário..."
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
      <form
        onSubmit={salvar}
        style={styles.formCard}
      >

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

        <div style={styles.inputGroup}>

          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={form.senha}
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

          {editando && (

            <button
              type="button"
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

      </form>

      {/* LISTA */}
      <div style={styles.list}>

        {usuariosFiltrados.map((usuario) => (

          <div
            key={usuario.id_usuario}
            style={styles.card}
          >

            <h3>
              {usuario.nome}
            </h3>

            <p>
              <strong>Email:</strong>{" "}
              {usuario.email}
            </p>

            <div
              style={
                styles.cardButtons
              }
            >

              <button
                onClick={() =>
                  editar(usuario)
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
                    usuario.id_usuario
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

  searchContainer: {
    marginBottom: "20px",
  },

  searchInput: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border:
      "1px solid #ccc",
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
    border:
      "1px solid #ccc",
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

  cancelButton: {
    flex: 1,
    padding: "10px",
    background: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
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

export default Usuarios;