import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import './App.css'

// Fix icons for Leaflet in React (important)
L.Icon.Default.prototype._getIconUrl = undefined
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
})

function App() {
  return (
    <div className="App">
      <h1>Carte de Lyon</h1>
      <div id="map">
        <MapContainer center={[45.75, 4.85]} zoom={12} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[45.75, 4.85]}>
            <Popup>Lyon, France</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}

export default App