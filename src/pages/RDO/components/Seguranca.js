export default function Seguranca({ form, updateField }) {
  return (
    <div className="section">
      <h2>8. Segurança</h2>

      <input placeholder="DDS"
        onChange={e => updateField("dds", e.target.value)} />

      <input placeholder="Qtd DDS"
        onChange={e => updateField("ddsQtd", e.target.value)} />

      <input placeholder="Tema DDS"
        onChange={e => updateField("ddsTema", e.target.value)} />

      <input placeholder="EPIs"
        onChange={e => updateField("epis", e.target.value)} />

      <textarea placeholder="Observações"
        onChange={e => updateField("segObs", e.target.value)} />
    </div>
  );
}