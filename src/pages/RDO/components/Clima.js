export default function Clima({ form, updateField, updateArray }) {

  const opcoes = [
    { label: "☀️ Ensolarado", value: "Ensolarado" },
    { label: "🌧 Chuva", value: "Chuva" },
    { label: "☁️ Nublado", value: "Nublado" }
  ];

  return (
    <div className="section">

      <div className="section-header">
        <h2>3. Clima</h2>
      </div>

      <div className="weather-row">
        {opcoes.map(c => {
          const ativo = form.clima.includes(c.value);

          return (
            <label key={c.value} className={`weather-tag ${ativo ? "active" : ""}`}>

              <input
                type="checkbox"
                className="hidden-checkbox"
                checked={ativo}
                onChange={(e) =>
                  updateArray("clima", c.value, e.target.checked)
                }
              />

              {c.label}
            </label>
          );
        })}
      </div>

      <div className="field full">
        <label>Impacto do clima na obra</label>
        <textarea
          placeholder="Ex: chuva atrasou concretagem..."
          value={form.impactoClima || ""}
          onChange={(e) =>
            updateField("impactoClima", e.target.value)
          }
        />
      </div>

    </div>
  );
}