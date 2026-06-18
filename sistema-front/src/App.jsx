import { useState } from "react";

import Login from "./pages/Login";

import Clientes from "./pages/Clientes";
import Equipamentos from "./pages/Equipamentos";
import Ordens from "./pages/ordens";
import Usuarios from "./pages/Usuarios";
import Servicos from "./pages/Servicos";
import Pagamentos from "./pages/Pagamentos";

export default function App() {

  /* LOGIN */
  const [logado, setLogado] =
    useState(

      localStorage.getItem(
        "token"
      )

    );

  const [pagina, setPagina] =
    useState("clientes");

  const [menuAberto,
    setMenuAberto] =
    useState(false);

  function trocarPagina(
    nomePagina
  ) {

    setPagina(nomePagina);

    setMenuAberto(false);

  }

  /* LOGOUT */
  function sair() {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "usuario"
    );

    window.location.reload();

  }

  /* BLOQUEIA SISTEMA */
  if (!logado) {

    return (

      <Login
        aoLogar={() =>
          setLogado(true)
        }
      />

    );
  }

  return (

    <div style={styles.app}>

      <header style={styles.header}>

        {/* MENU */}
        <button
          style={styles.hamburger}
          onClick={() =>
            setMenuAberto(
              !menuAberto
            )
          }
        >
          ☰
        </button>

        <h1 style={styles.logo}>
          Assistência Técnica
        </h1>

        {/* SAIR */}
        <button
          onClick={sair}
          style={styles.logoutButton}
        >

          Sair

        </button>

        {/* MENU */}
        <div
          style={{

            ...styles.menu,

            transform: menuAberto

              ? "translateX(0)"

              : "translateX(-120%)",

            opacity:
              menuAberto
                ? 1
                : 0,

            pointerEvents:
              menuAberto
                ? "auto"
                : "none",

            transition:
              "all 0.3s ease",

          }}
        >

          {/* CLIENTES */}
          <button
            onClick={() =>
              trocarPagina(
                "clientes"
              )
            }
            style={
              pagina ===
              "clientes"

                ? {

                    ...styles.button,

                    ...styles.activeButton,

                  }

                : styles.button
            }
          >

            Clientes

          </button>

          {/* EQUIPAMENTOS */}
          <button
            onClick={() =>
              trocarPagina(
                "equipamentos"
              )
            }
            style={
              pagina ===
              "equipamentos"

                ? {

                    ...styles.button,

                    ...styles.activeButton,

                  }

                : styles.button
            }
          >

            Equipamentos

          </button>

          {/* ORDENS */}
          <button
            onClick={() =>
              trocarPagina(
                "ordens"
              )
            }
            style={
              pagina ===
              "ordens"

                ? {

                    ...styles.button,

                    ...styles.activeButton,

                  }

                : styles.button
            }
          >

            Ordens

          </button>

          {/* USUÁRIOS */}
          <button
            onClick={() =>
              trocarPagina(
                "usuarios"
              )
            }
            style={
              pagina ===
              "usuarios"

                ? {

                    ...styles.button,

                    ...styles.activeButton,

                  }

                : styles.button
            }
          >

            Usuários

          </button>

          {/* SERVIÇOS */}
          <button
            onClick={() =>
              trocarPagina(
                "servicos"
              )
            }
            style={
              pagina ===
              "servicos"

                ? {

                    ...styles.button,

                    ...styles.activeButton,

                  }

                : styles.button
            }
          >

            Serviços

          </button>

          {/* PAGAMENTOS */}
          <button
            onClick={() =>
              trocarPagina(
                "pagamentos"
              )
            }
            style={
              pagina ===
              "pagamentos"

                ? {

                    ...styles.button,

                    ...styles.activeButton,

                  }

                : styles.button
            }
          >

            Pagamentos

          </button>

        </div>

      </header>

      <main style={styles.main}>

        {pagina ===
          "clientes" && (
          <Clientes />
        )}

        {pagina ===
          "equipamentos" && (
          <Equipamentos />
        )}

        {pagina ===
          "ordens" && (
          <Ordens />
        )}

        {pagina ===
          "usuarios" && (
          <Usuarios />
        )}

        {pagina ===
          "servicos" && (
          <Servicos />
        )}

        {pagina ===
          "pagamentos" && (
          <Pagamentos />
        )}

      </main>

    </div>
  );
}

const styles = {

  app: {

    minHeight: "100vh",

    backgroundColor:
      "#f4f6f8",

  },

  header: {

    backgroundColor:
      "#ffffff",

    boxShadow:
      "0 2px 8px rgba(0,0,0,0.08)",

    padding: "20px",

    display: "flex",

    alignItems:
      "center",

    gap: "20px",

    position:
      "relative",

  },

  logo: {

    margin: 0,

    fontFamily:
      "Arial",

    fontSize: "28px",

    color: "#333",

  },

  hamburger: {

    fontSize: "28px",

    border: "none",

    background:
      "transparent",

    cursor: "pointer",

    color: "#333",

  },

  logoutButton: {

    marginLeft: "auto",

    padding: "10px 15px",

    border: "none",

    borderRadius: "8px",

    backgroundColor:
      "#dc3545",

    color: "#fff",

    cursor: "pointer",

    fontWeight: "bold",

  },

  menu: {

    position:
      "absolute",

    top: "80px",

    left: "20px",

    width: "220px",

    backgroundColor:
      "#fff",

    borderRadius: "12px",

    boxShadow:
      "0 4px 15px rgba(0,0,0,0.15)",

    padding: "15px",

    display: "flex",

    flexDirection:
      "column",

    gap: "10px",

    zIndex: 1000,

  },

  button: {

    padding: "12px",

    border: "none",

    borderRadius: "8px",

    backgroundColor:
      "#e9ecef",

    color: "#333",

    cursor: "pointer",

    fontWeight: "bold",

    fontSize: "15px",

    transition: "0.2s",

  },

  activeButton: {

    backgroundColor:
      "#007bff",

    color: "#fff",

  },

  main: {

    padding: "20px",

  },

};