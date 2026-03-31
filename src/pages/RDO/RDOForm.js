import React, { useState, useEffect } from "react";

import "./RDOForm.css";
import "leaflet/dist/leaflet.css";

import Identificacao from "./components/Identificacao";
import Localizacao from "./components/Localizacao";
import Clima from "./components/Clima";
import MaoDeObra from "./components/MaoDeObra";
import Equipamentos from "./components/Equipamentos";
import Atividades from "./components/Atividades";
import Ocorrencias from "./components/Ocorrencias";
import Seguranca from "./components/Seguranca";
import Observacoes from "./components/Observacoes";
import Fotos from "./components/Fotos";
import ExportarPDF from "./components/ExportarPDF";

export default function RDOForm() {

  const [loading, setLoading] = useState(false);

  const initialState = {
    obra: "", contrato: "", rdoNum: "", responsavel: "",
    empresa: "", cliente: "", endereco: "",
    data: "", diaSemana: "",
    latitude: "", longitude: "",

    tempMin: "", tempMax: "", umidade: "",
    clima: [],

    maoDeObra: [],
    equipamentos: [],
    atividades: [],

    ocorrencias: [],
    ocorrenciaDesc: "",

    dds: "", ddsQtd: "", ddsTema: "",
    epis: "", segObs: "",

    obsGerais: "", proximas: "",
    pendentes: "", comunicados: "",

    fotos: []
  };

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    const hoje = new Date();
    const dias = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];

    setForm(prev => ({
      ...prev,
      data: hoje.toISOString().split("T")[0],
      diaSemana: dias[hoje.getDay()]
    }));
  }, []);

  // 🧠 Atualiza campo simples
  function updateField(name, value) {
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  // 🧠 Atualiza checkbox array
  function updateArray(field, value, checked) {
    setForm(prev => ({
      ...prev,
      [field]: checked
        ? [...prev[field], value]
        : prev[field].filter(v => v !== value)
    }));
  }

  // 🚀 SALVAR
  async function salvar() {

  if (loading) return;

  if (!form.obra || !form.cliente) {
    alert("Preencha pelo menos Obra e Cliente!");
    return;
  }

  setLoading(true);

  try {
    const maoDeObraStr = form.maoDeObra
      .map(m => `${m.nome || ""}-${m.funcao || ""}-${m.qtd || 0}`)
      .join(";");

    const equipamentosStr = form.equipamentos
      .map(e => `${e.nome || ""}-${e.qtd || 0}`)
      .join(";");

    const atividadesStr = form.atividades.join(";");

    const ensolarado = form.clima.includes("Ensolarado");
    const chuva = form.clima.includes("Chuva");
    const nublado = form.clima.includes("Nublado");

    const atrasoMaterial = form.ocorrencias.includes("Atraso de Material");
    const acidente = form.ocorrencias.includes("Acidente");
    const chuvaOcorrencia = form.ocorrencias.includes("Chuva");
    const fiscalizacao = form.ocorrencias.includes("Fiscalização");

    const dados = {
      obra: form.obra,
      contrato: form.contrato,
      rdoNum: form.rdoNum,
      responsavel: form.responsavel,
      empresa: form.empresa,
      cliente: form.cliente,
      endereco: form.endereco,

      data: form.data,
      diaSemana: form.diaSemana,

      latitude: form.latitude ? Number(form.latitude) : null,
      longitude: form.longitude ? Number(form.longitude) : null,

      tempMin: form.tempMin ? Number(form.tempMin) : null,
      tempMax: form.tempMax ? Number(form.tempMax) : null,
      umidade: form.umidade ? Number(form.umidade) : null,

      ensolarado,
      chuva,
      nublado,

      maoDeObra: maoDeObraStr,
      equipamentos: equipamentosStr,
      atividades: atividadesStr,

      atrasoMaterial,
      acidente,
      chuvaOcorrencia,
      fiscalizacao,
      ocorrenciaDesc: form.ocorrenciaDesc,

      dds: form.dds,
      qtdDds: form.ddsQtd ? Number(form.ddsQtd) : null,
      temaDds: form.ddsTema,
      epis: form.epis,
      observacoesSeguranca: form.segObs,

      observacoesGerais: form.obsGerais,
      proximasAtividades: form.proximas,
      pendentes: form.pendentes,
      comunicados: form.comunicados,

      status: "PENDENTE"
    };

    const formData = new FormData();

    // 📦 JSON
    formData.append(
      "dados",
      new Blob([JSON.stringify(dados)], { type: "application/json" })
    );

    // 📸 ARQUIVOS (🔥 CORREÇÃO AQUI)
    form.fotos.forEach(foto => {
      formData.append("fotos", foto.file, foto.file.name);
    });

    // 🧪 debug
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const response = await fetch("http://localhost:8080/ordem-servico", {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      const erro = await response.text();
      throw new Error(erro);
    }

    alert("✅ RDO salva com sucesso!");

  } catch (err) {
    console.error(err);
    alert("❌ Erro ao salvar: " + err.message);
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="rdo-container">

      <Identificacao form={form} updateField={updateField} />
      <Localizacao form={form} setForm={setForm} />
      <Clima form={form} updateField={updateField} updateArray={updateArray} />
      <MaoDeObra form={form} setForm={setForm} />
      <Equipamentos form={form} setForm={setForm} />
      <Atividades form={form} setForm={setForm} />
      <Ocorrencias form={form} updateArray={updateArray} updateField={updateField} />
      <Seguranca form={form} updateField={updateField} />
      <Observacoes form={form} updateField={updateField} />
      <Fotos form={form} setForm={setForm} />

      <ExportarPDF form={form} />

      {/* 💾 BOTÃO SALVAR */}
      <button 
        className="btn-save"
        onClick={salvar}
        disabled={loading}
      >
        {loading ? "Salvando..." : "💾 Salvar RDO"}
      </button>

    </div>
  );
}