export default function MaoDeObra({ form, setForm }) {

  function add() {
    setForm(prev => ({
      ...prev,
      maoDeObra: [...prev.maoDeObra, { funcao: "", qtd: "" }]
    }));
  }

  function remove(i) {
    setForm(prev => ({
      ...prev,
      maoDeObra: prev.maoDeObra.filter((_, idx) => idx !== i)
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

          <button
            className="row-del"
            onClick={() => remove(i)}
          >
            ✖
          </button>

        </div>
      ))}

      <button className="btn-add" onClick={add}>
        + Adicionar
      </button>
    </div>
  );
}