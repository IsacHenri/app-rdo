import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home({ onLogout }) {
  const navigate = useNavigate();

  // 👤 pegar usuário da sessão
  const usuario = JSON.parse(sessionStorage.getItem("usuario"));

  return (
    <div className="home-container">

      {/* 📱 SIDEBAR */}
      <div className="sidebar">
        <h2>SATEL</h2>

        <ul>
          <li onClick={() => navigate("/home")}>Início</li>
          <li onClick={() => navigate("/rdo")}>Relatórios</li>
          <li onClick={() => navigate("/rvm")}>Relatórios via Mapa</li>
          <li>Configurações</li>
        </ul>

        <button className="logout-btn" onClick={onLogout}>
          Sair
        </button>
      </div>

      {/* 📊 CONTEÚDO */}
      <div className="content">

        {/* 👋 HEADER */}
        <div className="header">
          <h1>Dashboard</h1>
          <p>
            Bem-vindo, <strong>{usuario?.nome || usuario?.usuario || "Usuário"}</strong> 👋
          </p>
        </div>

        {/* 🧱 CARDS */}
        <div className="cards">

          <div className="card">
            <h3>Relatório Diário de Obra</h3>
            <button onClick={() => navigate("/rdo")}>
              Acessar
            </button>
          </div>

          <div className="card disabled">
            <h3>Uso de Carro</h3>
            <button disabled>Em breve</button>
          </div>

          <div className="card">
            <h3>Backlog</h3>
            <button onClick={() => alert("Ainda não implementado")}>
              Acessar
            </button>
          </div>

          <div className="card">
            <h3>Relatório RDOs via Mapa</h3>
            <button onClick={() => navigate("/rvm")}>
              Acessar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}