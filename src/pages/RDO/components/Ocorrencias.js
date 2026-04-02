export default function Ocorrencias({ form, updateField }) {

  const tipos = [
    "Atraso de Material",
    "Acidente",
    "Chuva",
    "Fiscalização"
  ];

  function selectTipo(tipo) {
    // Se clicar no mesmo, desmarca
    if (form.ocorrenciaSelecionada === tipo) {
      updateField("ocorrenciaSelecionada", "");
      updateField("ocorrenciaDesc", "");
    } else {
      updateField("ocorrenciaSelecionada", tipo);
    }
  }

  const temOcorrencia = !!form.ocorrenciaSelecionada;

  return (
    <div className="section">
      <h2>7. Ocorrências</h2>

      <div className="ocorrencia-grid">
        {tipos.map((o) => {
          const active = form.ocorrenciaSelecionada === o;

          return (
            <div
              key={o}
              className={`oc-card ${active ? "active" : ""}`}
              onClick={() => selectTipo(o)}
            >
              <input
                type="radio"
                checked={active}
                onChange={() => selectTipo(o)}
              />
              <span>{o}</span>
            </div>
          );
        })}
      </div>

      {/* 👇 Só aparece se tiver ocorrência */}
      {temOcorrencia && (
        <div className="field" style={{ marginTop: 16 }}>
          <label>Observação (obrigatório)</label>

          <textarea
            name="ocorrenciaDesc"
            value={form.ocorrenciaDesc || ""}
            placeholder="Descreva a ocorrência..."
            onChange={e => updateField(e.target.name, e.target.value)}
            required
          />
        </div>
      )}
    </div>
  );
}