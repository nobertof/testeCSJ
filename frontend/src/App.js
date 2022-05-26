import React, {useState, useEffect} from 'react';
import './App.css';
import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import {marker} from './Icons';

const provider = new OpenStreetMapProvider();
function App() {
  function LocationMarker() {
    const map = useMap()
    map.flyTo(localization,13)
    return localization === null ? null : (
      <Marker position={localization}>
        <Popup>Ponto de coleta</Popup>
      </Marker>
    )
  }
  const [localization, setLocalization] = useState([51.505, -0.09]);
  useEffect(()=>{
    provider.search({ query: 'Rua Benedito Luiz de Medeiros,São José dos Campos' }).then(results=>{
      console.log(results)
      setLocalization([results[0].y,results[0].x])
    });
  },[])
  
  return (
    <MapContainer center={localization} zoom={13} scrollWheelZoom={true} className={'map'}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker/>
      <Marker icon={marker} position={localization} >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default App;
