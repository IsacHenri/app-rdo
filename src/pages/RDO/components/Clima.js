export default function Clima({ form, updateField, updateArray }) {

  const opcoes = ["☀️ Ensolarado","🌧 Chuva","☁️ Nublado"];

  return (
    <div className="section">
      <h2>3. Clima</h2>

      <input value={form.tempMin} onChange={(e)=>updateField("tempMin", e.target.value)} placeholder="Temp Min"/>
      <input value={form.tempMax} onChange={(e)=>updateField("tempMax", e.target.value)} placeholder="Temp Max"/>
      <input value={form.umidade} onChange={(e)=>updateField("umidade", e.target.value)} placeholder="Umidade"/>

      {opcoes.map(c => (
        <label key={c}>
          <input
            type="checkbox"
            checked={form.clima.includes(c)}
            onChange={(e)=>updateArray("clima", c, e.target.checked)}
          />
          {c}
        </label>
      ))}
    </div>
  );
}