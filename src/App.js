import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import RDOForm from "./pages/RDO/RDOForm";
import MapaRDO from "./pages/MapaRDO";

export default function App() {

  const [logado, setLogado] = useState(
    !!sessionStorage.getItem("auth")
  );

  function RotaPrivada({ children }) {
    const autenticado = sessionStorage.getItem("auth");
    return autenticado ? children : <Navigate to="/" />;
  }

  function logout() {
    sessionStorage.clear();
    setLogado(false);
  }

  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route
          path="/"
          element={
            logado ? (
              <Navigate to="/home" />
            ) : (
              <div className="container">
                <div className="login-box">

                  <div className="logo">
                    <h1>SATEL BRASIL</h1>
                    <p>Sistema Inteligente</p>
                  </div>

                  <form
                    className="form"
                    onSubmit={async (e) => {
                      e.preventDefault();

                      const email = e.target.email.value;
                      const senha = e.target.senha.value;

                      console.log("📤 Enviando login:", { email, senha });

                      try {
                        const response = await fetch("http://localhost:8080/auth/login", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json"
                          },
                          body: JSON.stringify({
                            email,   // ✅ CORRIGIDO
                            senha
                          })
                        });

                        console.log("📥 Status:", response.status);

                        if (!response.ok) {
                          const erro = await response.text();
                          console.error("❌ Erro backend:", erro);
                          throw new Error(erro);
                        }

                        const data = await response.json();

                        console.log("✅ Login sucesso:", data);

                        // 🔐 salvar sessão
                        sessionStorage.setItem("auth", "true"); // backend não retorna token
                        sessionStorage.setItem("usuario", JSON.stringify(data));

                        setLogado(true);

                      } catch (error) {
                        console.error("❌ Erro no login:", error);
                        alert("Erro ao conectar com o servidor ou credenciais inválidas");
                      }
                    }}
                  >

                    <input
                      type="text"
                      name="email" // ✅ IMPORTANTE
                      placeholder="Email"
                      required
                    />

                    <input
                      type="password"
                      name="senha"
                      placeholder="Senha"
                      required
                    />

                    <button type="submit">Entrar</button>
                  </form>

                  <div className="footer">
                    <span>© 2026 JaguarSoft LTDA</span>
                  </div>

                </div>
              </div>
            )
          }
        />

        {/* HOME */}
        <Route
          path="/home"
          element={
            <RotaPrivada>
              <Home onLogout={logout} />
            </RotaPrivada>
          }
        />

        {/* RDO */}
        <Route
          path="/rdo"
          element={
            <RotaPrivada>
              <RDOForm />
            </RotaPrivada>
          }
        />

        {/* MAPA */}
        <Route
          path="/rvm"
          element={
            <RotaPrivada>
              <MapaRDO />
            </RotaPrivada>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}