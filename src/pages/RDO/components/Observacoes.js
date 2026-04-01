export default function Observacoes({ form, updateField }) {
  return (
    <div className="section">
      <h2>9. Observações</h2>

      <textarea placeholder="Observações gerais"
        onChange={e => updateField("obsGerais", e.target.value)} />

      <textarea placeholder="Próximas atividades"
        onChange={e => updateField("proximas", e.target.value)} />

      <textarea placeholder="Pendentes"
        onChange={e => updateField("pendentes", e.target.value)} />

      <textarea placeholder="Comunicados"
        onChange={e => updateField("comunicados", e.target.value)} />
    </div>
  );
}