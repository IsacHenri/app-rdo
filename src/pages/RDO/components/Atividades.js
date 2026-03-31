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
    setForm(prev => ({ ...prev, atividades: arr }));
  }

  return (
    <div className="section">
      <h2>5. Atividades</h2>

      {form.atividades.map((a, i) => (
        <div key={i}>
          <input placeholder="Descrição"
            onChange={ev => update(i, ev.target.value)} />

          <button onClick={() => remove(i)}>X</button>
        </div>
      ))}

      <button onClick={add}>+ Adicionar</button>
    </div>
  );
}