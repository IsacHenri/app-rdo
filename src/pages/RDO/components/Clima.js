export default function Clima({ form, updateField, updateArray }) {

  const opcoes = ["☀️ Ensolarado","🌧 Chuva","☁️ Nublado"];

  return (
    <div className="section">
      <h2>3. Clima</h2>

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