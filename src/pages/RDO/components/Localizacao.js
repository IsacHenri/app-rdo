import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 🔧 Corrige ícone
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// 🔥 Atualiza mapa corretamente
function AtualizarMapa({ lat, lng }) {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize(); // 🔥 ESSENCIAL
    }, 100);

    if (!isNaN(lat) && !isNaN(lng)) {
      map.setView([lat, lng], 16);
    }
  }, [lat, lng, map]);

  return null;
}

export default function Localizacao({ form, setForm }) {

  function pegarLocalizacao() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm(prev => ({
          ...prev,
          latitude: pos.coords.latitude.toFixed(6),
          longitude: pos.coords.longitude.toFixed(6)
        }));
      },
      () => alert("Erro ao obter localização")
    );
  }

  const lat = parseFloat(form.latitude);
  const lng = parseFloat(form.longitude);

  const temCoordenada = !isNaN(lat) && !isNaN(lng);

  return (
    <div className="section">
      <div className="section-header">
        <h2>2. Localização</h2>
      </div>

      <button className="btn-add" type="button" onClick={pegarLocalizacao}>
        📡 Obter Localização
      </button>

      <div className="coords-row">
        <input value={form.latitude || ""} readOnly placeholder="Latitude" />
        <input value={form.longitude || ""} readOnly placeholder="Longitude" />
      </div>

      <div className="map-container">
        <MapContainer
          center={temCoordenada ? [lat, lng] : [-23.55, -46.63]}
          zoom={temCoordenada ? 16 : 13}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <AtualizarMapa lat={lat} lng={lng} />

          {temCoordenada && (
            <Marker position={[lat, lng]} />
          )}
        </MapContainer>
      </div>
    </div>
  );
}