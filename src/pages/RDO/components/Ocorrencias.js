export default function Ocorrencias({ form, updateArray, updateField }) {

  const tipos = [
    "Atraso de Material",
    "Acidente",
    "Chuva",
    "Fiscalização"
  ];

  return (
    <div className="section">
      <h2>7. Ocorrências</h2>

      {tipos.map(o => (
        <label key={o}>
          <input
            type="checkbox"
            checked={form.ocorrencias.includes(o)}
            onChange={e => updateArray("ocorrencias", o, e.target.checked)}
          />
          {o}
        </label>
      ))}

      <textarea
        name="ocorrenciaDesc"
        value={form.ocorrenciaDesc || ""}
        placeholder="Descrição"
        onChange={e => updateField(e.target.name, e.target.value)}
      />
    </div>
  );
}