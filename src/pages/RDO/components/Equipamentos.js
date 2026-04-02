export default function Equipamentos({ form, setForm }) {

  function add() {
    setForm(prev => ({
      ...prev,
      equipamentos: [...prev.equipamentos, { nome: "", qtd: "" }]
    }));
  }

  function remove(i) {
    setForm(prev => ({
      ...prev,
      equipamentos: prev.equipamentos.filter((_, idx) => idx !== i)
    }));
  }

  function update(i, field, value) {
    const arr = [...form.equipamentos];
    arr[i][field] = value;

    setForm(prev => ({
      ...prev,
      equipamentos: arr
    }));
  }

  return (
    <div className="section">
      <h2>5. Equipamentos</h2>

      {form.equipamentos.map((e, i) => (
        <div key={i} className="row-flex">

          <input
            placeholder="Equipamento"
            value={e.nome}
            onChange={ev => update(i, "nome", ev.target.value)}
          />

          <input
            placeholder="Quantidade"
            value={e.qtd}
            onChange={ev => update(i, "qtd", ev.target.value)}
          />

          <button
            className="row-del"
            onClick={() => remove(i)}
          >
            X
          </button>

        </div>
      ))}

      <button className="btn-add" onClick={add}>
        + Adicionar
      </button>
    </div>
  );
}