import React, { useEffect, useState } from "react";
import "./MapaRDO.css";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 🔥 corrigir ícone do marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// 🎯 ajustar zoom automaticamente
function AjustarMapa({ dados }) {
  const map = useMap();

  useEffect(() => {
    if (dados.length > 0) {
      const bounds = dados.map(d => [d.latitude, d.longitude]);
      map.fitBounds(bounds);
    }
  }, [dados, map]);

  return null;
}

export default function MapaRDO() {

  const [dados, setDados] = useState([]);
  const [busca, setBusca] = useState("");

  const API = "http://localhost:8080"; // ⚠️ troque para ngrok se necessário

  // 🔄 carregar todos
  function carregar() {
    fetch(`${API}/ordens`)
      .then(res => res.json())
      .then(data => setDados(data));
  }

  // 🔎 buscar
  function buscar() {
    if (!busca) {
      carregar();
      return;
    }

    fetch(`${API}/ordens/buscar?termo=${busca}`)
      .then(res => res.json())
      .then(data => setDados(data));
  }

  // 📡 GPS (opcional)
  function pegarLocalizacao() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      setDados([
        {
          id: "gps",
          obra: "Minha localização",
          status: "ATUAL",
          latitude: lat,
          longitude: lng
        }
      ]);
    });
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div className="mapa-container">

      <h2>Mapa de RDO</h2>

      <div className="top-bar">
        <input
          placeholder="Buscar por ID ou nome da obra"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <button onClick={buscar}>Buscar</button>
        <button onClick={carregar}>Limpar</button>
        <button onClick={pegarLocalizacao}>📡 GPS</button>
      </div>

      <div className="map-wrapper">
        <MapContainer
          center={[-23.55, -46.63]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {dados.map((os) => (
            os.latitude && os.longitude && (
              <Marker
                key={os.id}
                position={[os.latitude, os.longitude]}
              >
                <Popup>
                  <b>Endereço:</b> {os.endereco}<br />
                  <b>Obra:</b> {os.obra}<br />
                  <b>Status:</b> {os.status}
                </Popup>
              </Marker>
            )
          ))}

          <AjustarMapa dados={dados} />
        </MapContainer>
      </div>

    </div>
  );
}