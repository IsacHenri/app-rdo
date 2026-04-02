export default function MaoDeObra({ form, setForm }) {

  function add() {
    setForm(prev => ({
      ...prev,
      maoDeObra: [...prev.maoDeObra, { funcao: "", qtd: "" }]
    }));
  }

  function update(i, field, value) {
    const arr = [...form.maoDeObra];
    arr[i][field] = value;

    setForm(prev => ({
      ...prev,
      maoDeObra: arr
    }));
  }

  function clearAll() {
    if (form.maoDeObra.length === 0) return;
    if (window.confirm("Tem certeza de que deseja excluir todas as entradas de mão de obra?")) {
      setForm(prev => ({
        ...prev,
        maoDeObra: []
      }));
    }
  }

  return (
    <div className="section">
      <h2>4. Mão de Obra</h2>

      {form.maoDeObra.map((m, i) => (
        <div key={i} className="row-flex">

          <input
            placeholder="Função"
            value={m.funcao}
            onChange={(e) => update(i, "funcao", e.target.value)}
          />

          <input
            placeholder="Quantidade"
            value={m.qtd}
            onChange={(e) => update(i, "qtd", e.target.value)}
          />

        </div>
      ))}

      <div style={{ display: "flex", gap: "8px", marginTop: 8 }}>
        <button className="btn-add" onClick={add}>
          + Adicionar
        </button>

        <button
          className="btn-clear-all"
          onClick={clearAll}
          disabled={form.maoDeObra.length === 0}
        >
          🗑 Excluir tudo
        </button>
      </div>
    </div>
  );
}