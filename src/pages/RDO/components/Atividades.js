export default function Atividades({ form, setForm }) {

  function add() {
    setForm(prev => ({
      ...prev,
      atividades: [...prev.atividades, { desc: "" }]
    }));
  }

  function remove(i) {
    setForm(prev => ({
      ...prev,
      atividades: prev.atividades.filter((_, idx) => idx !== i)
    }));
  }


  function update(i, value) {
    const arr = [...form.atividades];
    arr[i].desc = value;

    setForm(prev => ({
      ...prev,
      atividades: arr
    }));
  }


  function clearAll() {
    if (form.atividades.length === 0) return;

    if (window.confirm("Tem certeza que deseja excluir todas as atividades?")) {
      setForm(prev => ({
        ...prev,
        atividades: []
      }));
    }
  }

  return (
    <div className="section">
      <h2>6. Atividades</h2>

      {form.atividades.map((a, i) => (
        <div key={i} className="row-flex">

          <input
            placeholder="Descrição"
            value={a.desc}
            onChange={ev => update(i, ev.target.value)}
          />

          <button
            className="row-del"
            onClick={() => remove(i)}
          >
            X
          </button>

        </div>
      ))}

      <div style={{ display: "flex", gap: "8px", marginTop: 8 }}>
        <button className="btn-add" onClick={add}>
          + Adicionar
        </button>

        <button
          className="btn-clear-all"
          onClick={clearAll}
          disabled={form.atividades.length === 0}
        >
          🗑 Excluir tudo
        </button>
      </div>

    </div>
  );
}