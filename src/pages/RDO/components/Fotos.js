
export default function Fotos({ form, setForm }) {

  function handleFiles(files) {

    const novas = Array.from(files).map(file => ({
      file,
      nome: file.name,
      tipo: file.type
    }));

    setForm(prev => ({
      ...prev,
      fotos: [...prev.fotos, ...novas]
    }));
  }

  function removerFoto(index) {
    setForm(prev => ({
      ...prev,
      fotos: prev.fotos.filter((_, i) => i !== index)
    }));
  }

  return (
    <div className="section">

      <div className="section-header">
        <h2>Fotos</h2>
      </div>

      {/* INPUT */}
      <input
        type="file"
        multiple
        accept="image/png, image/jpeg, image/jpg, image/webp"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {/* LISTA DE ARQUIVOS */}
      <div className="file-list">

        {form.fotos.length === 0 && (
          <p className="empty">Nenhuma foto adicionada</p>
        )}

        {form.fotos.map((f, i) => (
          <div key={i} className="file-item">

            <div className="file-info">
              📷 {f.nome}
            </div>

            <button
              type="button"
              className="btn-remove"
              onClick={() => removerFoto(i)}
            >
              ✕
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}