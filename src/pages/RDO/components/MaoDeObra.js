export default function MaoDeObra({ form, setForm }) {

  function add() {
    setForm(prev => ({
      ...prev,
      maoDeObra: [...prev.maoDeObra, { funcao: "", qtd: "" }]
    }));
  }

  return (
    <div className="section">
      <h2>4. Mão de Obra</h2>

      {form.maoDeObra.map((m, i) => (
        <div key={i}>
          <input onChange={(e)=>{
            const arr=[...form.maoDeObra];
            arr[i].funcao=e.target.value;
            setForm(prev=>({...prev,maoDeObra:arr}));
          }} placeholder="Função"/>

          <input onChange={(e)=>{
            const arr=[...form.maoDeObra];
            arr[i].qtd=e.target.value;
            setForm(prev=>({...prev,maoDeObra:arr}));
          }} placeholder="Qtd"/>
        </div>
      ))}

      <button onClick={add}>+</button>
    </div>
  );
}