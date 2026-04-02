export default function Ocorrencias({ form, updateField }) {

  const tipos = [
    "Atraso de Material",
    "Acidente",
    "Chuva",
    "Fiscalização"
  ];

  function toggleTipo(tipo) {
    const lista = form.ocorrencias || [];

    if (lista.includes(tipo)) {
      updateField(
        "ocorrencias",
        lista.filter(o => o !== tipo)
      );
    } else {
      updateField(
        "ocorrencias",
        [...lista, tipo]
      );
    }
  }

  const temOcorrencia = (form.ocorrencias || []).length > 0;

  return (
    <div className="section">
      <h2>7. Ocorrências</h2>

      <div className="ocorrencia-grid">
        {tipos.map((tipo) => {
          const ativo = (form.ocorrencias || []).includes(tipo);

          return (
            <div
              key={tipo}
              className={`oc-card ${ativo ? "active" : ""}`}
              onClick={() => toggleTipo(tipo)}
            >
              <input
                type="checkbox"
                checked={ativo}
                onChange={() => toggleTipo(tipo)}
              />
              <span>{tipo}</span>
            </div>
          );
        })}
      </div>

      {temOcorrencia && (
        <div className="field" style={{ marginTop: 16 }}>
          <label>Observação (obrigatório)</label>

          <textarea
            value={form.ocorrenciaDesc || ""}
            placeholder="Descreva a ocorrência..."
            onChange={e => updateField("ocorrenciaDesc", e.target.value)}
          />
        </div>
      )}
    </div>
  );
}