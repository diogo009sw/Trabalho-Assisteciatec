import { useState } from "react";

function Login({ aoLogar }) {

  const [cadastro, setCadastro] =
    useState(false);

  const [nome, setNome] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [senha, setSenha] =
    useState("");

  /* =========================
     LOGIN
  ========================= */
  async function entrar() {

    try {

      const resposta =
        await fetch(

          "http://localhost:3000/usuarios/login",

          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

            },

            body: JSON.stringify({

              email,
              senha,

            }),

          }
        );

      const data =
        await resposta.json();

      if (!resposta.ok) {

        alert(data.erro);

        return;

      }

      /* TOKEN */
      localStorage.setItem(
        "token",
        data.token
      );

      /* USUÁRIO */
      localStorage.setItem(
        "usuario",
        JSON.stringify(data.usuario)
      );

      alert(
        "Login realizado!"
      );

      aoLogar();

    } catch (err) {

      console.error(err);

      alert(
        "Erro no login"
      );

    }
  }

  /* =========================
     CADASTRO
  ========================= */
  async function cadastrar() {

    try {

      const resposta =
        await fetch(

          "http://localhost:3000/usuarios",

          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

            },

            body: JSON.stringify({

              nome,
              email,
              senha,

            }),

          }
        );

      const data =
        await resposta.json();

      if (!resposta.ok) {

        alert(data.erro);

        return;

      }

      alert(
        "Conta criada!"
      );

      setCadastro(false);

      setNome("");
      setEmail("");
      setSenha("");

    } catch (err) {

      console.error(err);

      alert(
        "Erro ao cadastrar"
      );

    }
  }

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h1>

          {cadastro
            ? "Cadastro"
            : "Login"}

        </h1>

        {/* NOME */}
        {cadastro && (

          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) =>
              setNome(
                e.target.value
              )
            }
            style={styles.input}
          />

        )}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          style={styles.input}
        />

        {/* SENHA */}
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) =>
            setSenha(
              e.target.value
            )
          }
          style={styles.input}
        />

        {/* BOTÃO */}
        <button
          onClick={
            cadastro
              ? cadastrar
              : entrar
          }
          style={styles.button}
        >

          {cadastro
            ? "Cadastrar"
            : "Entrar"}

        </button>

        {/* TROCAR */}
        <button
          onClick={() =>
            setCadastro(
              !cadastro
            )
          }
          style={styles.linkButton}
        >

          {cadastro

            ? "Já tenho conta"

            : "Não tenho conta"}

        </button>

      </div>

    </div>
  );
}

const styles = {

  container: {

    height: "100vh",

    display: "flex",

    justifyContent:
      "center",

    alignItems:
      "center",

    backgroundColor:
      "#f4f6f8",

  },

  card: {

    backgroundColor:
      "#fff",

    padding: "30px",

    borderRadius: "10px",

    width: "300px",

    display: "flex",

    flexDirection:
      "column",

    gap: "10px",

    boxShadow:
      "0 4px 10px rgba(0,0,0,0.1)",

  },

  input: {

    padding: "10px",

    borderRadius: "6px",

    border:
      "1px solid #ccc",

  },

  button: {

    padding: "10px",

    backgroundColor:
      "#007bff",

    color: "#fff",

    border: "none",

    borderRadius: "6px",

    cursor: "pointer",

    fontWeight: "bold",

  },

  linkButton: {

    border: "none",

    background:
      "transparent",

    color: "#007bff",

    cursor: "pointer",

    marginTop: "10px",

  },

};

export default Login;