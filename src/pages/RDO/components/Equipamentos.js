export default function Equipamentos({ form, setForm }) {

  function add() {
    setForm(prev => ({
      ...prev,
      equipamentos: [...prev.equipamentos, { nome: "" }]
    }));
  }

  function update(i, value) {
    const arr = [...form.equipamentos];
    arr[i].nome = value;

    setForm(prev => ({
      ...prev,
      equipamentos: arr
    }));
  }

  function clearAll() {
    if (form.equipamentos.length === 0) return;

    if (window.confirm("Tem certeza que deseja excluir todos os equipamentos?")) {
      setForm(prev => ({
        ...prev,
        equipamentos: []
      }));
    }
  }

  return (
    <div className="section">
      <h2>5. Equipamentos</h2>

      {form.equipamentos.map((e, i) => (
        <div key={i} className="row-flex">

          <input
            placeholder="Equipamento"
            value={e.nome}
            onChange={(ev) => update(i, ev.target.value)}
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
          disabled={form.equipamentos.length === 0}
        >
          🗑 Excluir tudo
        </button>
      </div>
    </div>
  );
}