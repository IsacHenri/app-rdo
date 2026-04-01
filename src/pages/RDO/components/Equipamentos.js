export default function Equipamentos({ form, setForm }) {

  function add() {
    setForm(prev => ({
      ...prev,
      equipamentos: [...prev.equipamentos, { nome: "" }]
    }));
  }

  function remove(i) {
    setForm(prev => ({
      ...prev,
      equipamentos: prev.equipamentos.filter((_, idx) => idx !== i)
    }));
  }

  function update(i, value) {
    const arr = [...form.equipamentos];
    arr[i].nome = value;
    setForm(prev => ({ ...prev, equipamentos: arr }));
  }

  return (
    <div className="section">
      <h2>5. Equipamentos</h2>

      {form.equipamentos.map((e, i) => (
        <div key={i}>
          <input placeholder="Equipamento"
            onChange={ev => update(i, ev.target.value)} />

          <button className="row-del" onClick={() => remove(i)}>X</button>
        </div>
      ))}

      <button className="btn-add" onClick={add}>+ Adicionar</button>
    </div>
  );
}