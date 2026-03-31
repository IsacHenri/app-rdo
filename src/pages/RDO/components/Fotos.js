import { useEffect } from "react";

export default function Fotos({ form, setForm }) {

  function handleFiles(files) {
    const novas = Array.from(files).map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));

    setForm(prev => ({
      ...prev,
      fotos: [...prev.fotos, ...novas]
    }));
  }

  function removerFoto(index) {
    setForm(prev => {
      const novas = [...prev.fotos];

      URL.revokeObjectURL(novas[index].url);
      novas.splice(index, 1);

      return {
        ...prev,
        fotos: novas
      };
    });
  }

  // 🔥 evita memory leak
  useEffect(() => {
    return () => {
      form.fotos.forEach(f => URL.revokeObjectURL(f.url));
    };
  }, [form.fotos]);

  return (
    <div className="section">
      <h2>Fotos</h2>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div className="photo-grid">
        {form.fotos.map((f, i) => (
          <div key={i} style={{ position: "relative" }}>
            <img src={f.url} alt="foto" />

            <button
              type="button"
              onClick={() => removerFoto(i)}
              style={{
                position: "absolute",
                top: 5,
                right: 5,
                background: "red",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: 25,
                height: 25,
                cursor: "pointer"
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}