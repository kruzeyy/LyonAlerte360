import './App.css'

function App() {
  return (
    <div className="app-container">
      <img
        src="/images/Logo.png"
        alt="Logo"
        className="logo"
        style={{ width: '150px', height: '150px' }}
      />
      <h1 className="site-title">Lyon Alerte 360</h1>
      <div className="image-container">
        <img
          src="/images/carte-lyon.png"
          alt="Carte des arrondissements de Lyon"
          className="carte-image"
        />
      </div>
    </div>
  )
}

export default App