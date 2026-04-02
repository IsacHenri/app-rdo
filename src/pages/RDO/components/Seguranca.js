export default function Seguranca({ form, updateField }) {
  return (
    <div className="section">
      <h2>8. Segurança</h2>

      <input
        placeholder="DDS"
        value={form.dds}
        onChange={e => updateField("dds", e.target.value)}
      />

      <input
        type="number"
        placeholder="Qtd DDS"
        value={form.ddsQtd}
        onChange={e => updateField("ddsQtd", e.target.value)}
      />

      <input
        placeholder="Tema DDS"
        value={form.ddsTema}
        onChange={e => updateField("ddsTema", e.target.value)}
      />

      <input
        placeholder="EPIs"
        value={form.epis}
        onChange={e => updateField("epis", e.target.value)}
      />

      <textarea
        placeholder="Observações"
        value={form.segObs}
        onChange={e => updateField("segObs", e.target.value)}
      />
    </div>
  );
}