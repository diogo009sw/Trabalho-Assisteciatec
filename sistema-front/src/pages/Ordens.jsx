import { useEffect, useState } from "react";

function Ordens() {
  const [filtroStatus, setFiltroStatus] =
  useState("Todos");

  const [ordens, setOrdens] =
    useState([]);

  const [ordensFiltradas,
    setOrdensFiltradas] =
    useState([]);

  const [pesquisa, setPesquisa] =
    useState("");

  const [clientes, setClientes] =
    useState([]);

  const [equipamentos, setEquipamentos] =
    useState([]);

  const [editandoId, setEditandoId] =
    useState(null);

  const [form, setForm] = useState({
    id_cliente: "",
    id_equipamento: "",
    descricao_problema: "",
    status: "Aberto",
  });

  useEffect(() => {
    carregarTudo();
  }, []);

 useEffect(() => {

  const filtradas =
    ordens.filter((ordem) => {

      const texto =
        `${ordem.id_ordem}
         ${ordem.cliente}
         ${ordem.equipamento}
         ${ordem.descricao_problema}
         ${ordem.status}`
          .toLowerCase();

      const pesquisaOk =
        texto.includes(
          pesquisa.toLowerCase()
        );

      const statusOk =
        filtroStatus === "Todos"
          ? true
          : ordem.status === filtroStatus;

      return (
        pesquisaOk &&
        statusOk
      );
    });

  setOrdensFiltradas(
    filtradas
  );

}, [
  pesquisa,
  filtroStatus,
  ordens
]);

  /* =========================
     CARREGAR DADOS
  ========================= */
  async function carregarTudo() {

    try {

      const [o, c, e] =
        await Promise.all([
          fetch(
            "http://localhost:3000/ordens"
          ),

          fetch(
            "http://localhost:3000/clientes"
          ),

          fetch(
            "http://localhost:3000/equipamentos"
          ),
        ]);

      const ordensData =
        await o.json();

      const clientesData =
        await c.json();

      const equipamentosData =
        await e.json();

      setOrdens(
        ordensData.ordens ||
          ordensData
      );

      setClientes(
        clientesData.clientes ||
          clientesData
      );

      setEquipamentos(
        equipamentosData.equipamentos ||
          equipamentosData
      );

    } catch (err) {

      console.error(err);
      alert("Erro ao carregar dados");
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
     LIMPAR FORM
  ========================= */
  function limparFormulario() {

    setForm({
      id_cliente: "",
      id_equipamento: "",
      descricao_problema: "",
      status: "Aberto",
    });

    setEditandoId(null);
  }

  /* =========================
     SALVAR
  ========================= */
  async function salvar() {

    if (
      !form.id_cliente ||
      !form.id_equipamento ||
      !form.descricao_problema
    ) {
      alert(
        "Preencha todos os campos"
      );
      return;
    }

    try {

      const url = editandoId
        ? `http://localhost:3000/ordens/${editandoId}`
        : "http://localhost:3000/ordens";

      const metodo =
        editandoId
          ? "PUT"
          : "POST";

      const resposta =
        await fetch(url, {
          method: metodo,

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            form
          ),
        });

      const dados =
        await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          dados.error ||
            "Erro ao salvar"
        );
      }

      alert(
        editandoId
          ? "OS atualizada!"
          : "OS criada!"
      );

      limparFormulario();
      carregarTudo();

    } catch (err) {

      console.error(err);
      alert("Erro ao salvar OS");
    }
  }

  /* =========================
     EDITAR
  ========================= */
  function editar(ordem) {

    setEditandoId(
      ordem.id_ordem
    );

    setForm({
      id_cliente:
        ordem.id_cliente,

      id_equipamento:
        ordem.id_equipamento,

      descricao_problema:
        ordem.descricao_problema,

      status: ordem.status,
    });
  }

  /* =========================
     EXCLUIR
  ========================= */
  async function excluir(id) {

    const confirmar =
      window.confirm(
        "Deseja excluir esta OS?"
      );

    if (!confirmar) return;

    try {

      await fetch(
        `http://localhost:3000/ordens/${id}`,
        {
          method: "DELETE",
        }
      );

      alert("OS excluída!");

      carregarTudo();

    } catch (err) {

      console.error(err);
      alert("Erro ao excluir");
    }
  }

  return (

    <div style={styles.container}>

      <h1 style={styles.title}>
        Ordens de Serviço
      </h1>

      {/* PESQUISA */}
      <input
        type="text"
        placeholder="Pesquisar ordem..."
        value={pesquisa}
        onChange={(e) =>
          setPesquisa(e.target.value)
        }
        style={styles.searchInput}
      />
      <select
  value={filtroStatus}
  onChange={(e) =>
    setFiltroStatus(e.target.value)
  }
  style={styles.searchInput}
>
  <option value="Todos">
    Todos os Status
  </option>

  <option value="Aberto">
    Apenas Abertos
  </option>

  <option value="Em andamento">
    Apenas Em andamento
  </option>

  <option value="Concluído">
    Apenas Concluídos
  </option>
</select>

      {/* FORM */}
      <div style={styles.formCard}>

        <h2>
          {editandoId
            ? "Editar Ordem"
            : "Cadastrar Ordem"}
        </h2>

        {/* CLIENTE E EQUIPAMENTO */}
        <div style={styles.inputGroup}>

          <select
            name="id_cliente"
            value={form.id_cliente}
            onChange={handleChange}
            style={styles.input}
          >

            <option value="">
              Selecione o Cliente
            </option>

            {clientes.map(
              (cliente) => (

                <option
                  key={
                    cliente.id_cliente
                  }

                  value={
                    cliente.id_cliente
                  }
                >
                  {cliente.nome}
                </option>

              )
            )}

          </select>

          <select
            name="id_equipamento"
            value={
              form.id_equipamento
            }
            onChange={handleChange}
            style={styles.input}
          >

            <option value="">
              Selecione o Equipamento
            </option>

            {equipamentos.map(
              (equipamento) => (

                <option
                  key={
                    equipamento.id_equipamento
                  }

                  value={
                    equipamento.id_equipamento
                  }
                >
                  {equipamento.tipo}
                </option>

              )
            )}

          </select>

        </div>

        {/* DESCRIÇÃO */}
        <div style={styles.inputGroup}>

          <input
            type="text"
            name="descricao_problema"
            placeholder="Descrição do problema"
            value={
              form.descricao_problema
            }
            onChange={handleChange}
            style={styles.input}
          />

        </div>

        {/* STATUS */}
        <div style={styles.inputGroup}>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            style={styles.input}
          >

            <option value="Aberto">
              Aberto
            </option>

            <option value="Em andamento">
              Em andamento
            </option>

            <option value="Concluído">
              Concluído
            </option>

          </select>

        </div>

        {/* BOTÕES */}
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

      {/* LISTAGEM */}
      {ordensFiltradas.length === 0 ? (

        <p
          style={{
            textAlign: "center",
          }}
        >
          Nenhuma Ordem encontrada
        </p>

      ) : (

        <div style={styles.grid}>

          {ordensFiltradas.map((ordem) => (

            <div
              key={ordem.id_ordem}
              style={styles.card}
            >

              <h3>
                Ordem: {ordem.id_ordem}
              </h3>

              <p>
                <strong>
                  Cliente:
                </strong>{" "}
                {ordem.cliente}
              </p>

              <p>
                <strong>
                  Equipamento:
                </strong>{" "}
                {ordem.equipamento}
              </p>

              <p>
                <strong>
                  Problema:
                </strong>{" "}
                {
                  ordem.descricao_problema
                }
              </p>

              <p>
                <strong>
                  Status:
                </strong>{" "}
                {ordem.status}
              </p>

              <div
                style={
                  styles.cardButtons
                }
              >

                <button
                  onClick={() =>
                    editar(ordem)
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
                      ordem.id_ordem
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

      )}

    </div>
  );
}

/* =========================
   ESTILOS
========================= */
const styles = {

  container: {
    padding: "30px",
    backgroundColor:
      "#f4f6f8",
    minHeight: "100vh",
  },

  title: {
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
    border:
      "1px solid #ccc",
  },

  buttonGroup: {
    display: "flex",
    gap: "10px",
  },

  saveButton: {
    flex: 1,
    padding: "10px",
    backgroundColor:
      "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  cancelButton: {
    flex: 1,
    padding: "10px",
    backgroundColor:
      "#6c757d",
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
    backgroundColor:
      "#ffc107",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  deleteButton: {
    flex: 1,
    padding: "8px",
    backgroundColor:
      "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Ordens;