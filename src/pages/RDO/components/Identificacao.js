export default function Identificacao({ form, updateField }) {
  return (
    <div className="section">
      <h2>1. Identificação</h2>

      <div className="grid">
        <input
          placeholder="Obra"
          value={form.obra}
          onChange={e => updateField("obra", e.target.value)}
        />

        <input
          placeholder="Contrato"
          value={form.contrato}
          onChange={e => updateField("contrato", e.target.value)}
        />

        <input
          placeholder="RDO"
          value={form.rdoNum}
          onChange={e => updateField("rdoNum", e.target.value)}
        />

        <input
          placeholder="Responsável"
          value={form.responsavel}
          onChange={e => updateField("responsavel", e.target.value)}
        />

        <input
          placeholder="Empresa"
          value={form.empresa}
          onChange={e => updateField("empresa", e.target.value)}
        />

        <input
          placeholder="Cliente"
          value={form.cliente}
          onChange={e => updateField("cliente", e.target.value)}
        />

        <input
          placeholder="Endereço"
          value={form.endereco}
          onChange={e => updateField("endereco", e.target.value)}
        />
      </div>
    </div>
  );
}