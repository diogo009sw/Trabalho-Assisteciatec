import React, { useEffect, useState } from "react";

function Equipamentos() {

  const [equipamentos, setEquipamentos] =
    useState([]);

  const [equipamentosFiltrados,
    setEquipamentosFiltrados] =
    useState([]);

  const [pesquisa, setPesquisa] =
    useState("");

  const [editando, setEditando] =
    useState(null);

  const [form, setForm] = useState({
    tipo: "",
    marca: "",
    modelo: "",
    numero_serie: "",
  });

  useEffect(() => {
    carregarEquipamentos();
  }, []);

  useEffect(() => {

    const filtrados =
      equipamentos.filter((equipamento) => {

        const texto =
          `${equipamento.tipo}
           ${equipamento.marca}
           ${equipamento.modelo}
           ${equipamento.numero_serie}`
            .toLowerCase();

        return texto.includes(
          pesquisa.toLowerCase()
        );
      });

    setEquipamentosFiltrados(
      filtrados
    );

  }, [pesquisa, equipamentos]);

  /* =========================
     LISTAR
  ========================= */
  async function carregarEquipamentos() {

    try {

      const res = await fetch(
        "http://localhost:3000/equipamentos"
      );

      const data = await res.json();

      setEquipamentos(data);

    } catch (err) {

      console.error(err);
      alert("Erro ao carregar equipamentos");
    }
  }

  /* =========================
     INPUTS
  ========================= */
  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  /* =========================
     LIMPAR
  ========================= */
  function limparFormulario() {

    setForm({
      tipo: "",
      marca: "",
      modelo: "",
      numero_serie: "",
    });

    setEditando(null);
  }

  /* =========================
     SALVAR
  ========================= */
  async function salvar(e) {

    e.preventDefault();

    if (
      !form.tipo ||
      !form.marca ||
      !form.modelo
    ) {
      alert("Preencha os campos");
      return;
    }

    try {

      const url = editando
        ? `http://localhost:3000/equipamentos/${editando}`
        : "http://localhost:3000/equipamentos";

      const metodo =
        editando ? "PUT" : "POST";

      const res = await fetch(url, {
        method: metodo,

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Erro ao salvar"
        );
      }

      alert(
        editando
          ? "Equipamento atualizado!"
          : "Equipamento cadastrado!"
      );

      limparFormulario();
      carregarEquipamentos();

    } catch (err) {

      console.error(err);
      alert("Erro ao salvar equipamento");
    }
  }

  /* =========================
     EDITAR
  ========================= */
  function editar(equipamento) {

    setEditando(
      equipamento.id_equipamento
    );

    setForm({
      tipo: equipamento.tipo,
      marca: equipamento.marca,
      modelo: equipamento.modelo,
      numero_serie:
        equipamento.numero_serie || "",
    });
  }

  /* =========================
     EXCLUIR
  ========================= */
  async function excluir(id) {

    const confirmar = window.confirm(
      "Deseja excluir este equipamento?"
    );

    if (!confirmar) return;

    try {

      await fetch(
        `http://localhost:3000/equipamentos/${id}`,
        {
          method: "DELETE",
        }
      );

      alert("Equipamento excluído!");

      carregarEquipamentos();

    } catch (err) {

      console.error(err);
      alert("Erro ao excluir");
    }
  }

  return (

    <div style={styles.container}>

      <h1 style={styles.header}>
        Cadastro de Equipamentos
      </h1>

      {/* PESQUISA */}
      <input
        type="text"
        placeholder="Pesquisar equipamento..."
        value={pesquisa}
        onChange={(e) =>
          setPesquisa(e.target.value)
        }
        style={styles.searchInput}
      />

      {/* FORM */}
      <form
        onSubmit={salvar}
        style={styles.formCard}
      >

        <div style={styles.inputGroup}>

          <input
            type="text"
            name="tipo"
            placeholder="Tipo"
            value={form.tipo}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="marca"
            placeholder="Marca"
            value={form.marca}
            onChange={handleChange}
            style={styles.input}
          />

        </div>

        <div style={styles.inputGroup}>

          <input
            type="text"
            name="modelo"
            placeholder="Modelo"
            value={form.modelo}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="numero_serie"
            placeholder="Número de Série"
            value={form.numero_serie}
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
              onClick={limparFormulario}
              style={styles.cancelButton}
            >
              Cancelar
            </button>

          )}

        </div>

      </form>

      {/* LISTA */}
      <div style={styles.list}>

        {equipamentosFiltrados.map(
          (equipamento) => (

            <div
              key={
                equipamento.id_equipamento
              }
              style={styles.card}
            >

              <h3>
                {equipamento.tipo}
              </h3>

              <p>
                <strong>Marca:</strong>{" "}
                {equipamento.marca}
              </p>

              <p>
                <strong>Modelo:</strong>{" "}
                {equipamento.modelo}
              </p>

              <p>
                <strong>
                  Número de Série:
                </strong>{" "}
                {
                  equipamento.numero_serie
                }
              </p>

              <div
                style={styles.cardButtons}
              >

                <button
                  onClick={() =>
                    editar(equipamento)
                  }
                  style={styles.editButton}
                >
                  Editar
                </button>

                <button
                  onClick={() =>
                    excluir(
                      equipamento.id_equipamento
                    )
                  }
                  style={styles.deleteButton}
                >
                  Excluir
                </button>

              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
}

/* =========================
   ESTILOS
========================= */
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

export default Equipamentos;