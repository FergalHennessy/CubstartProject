import React from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { createLogicalOr } from 'typescript';
import { logDOM } from '@testing-library/react';

function GetIcon(_iconSize: any, _whichIcon: string){
  return L.icon({
    iconUrl: require("./Images/" + _whichIcon + ".png"),
    iconSize: _iconSize
  })
}


function App() {

  //DEFINE SOME CONSTANT IN HERE WITH DATE PULLED FROM CENTRAL SERVER

  return (
      <MapContainer center={[37.869061, -122.270462]} zoom={13} scrollWheelZoom={true}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[37.869061, -122.270462]} icon={GetIcon(200, "test")}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
  <Marker position={[37.969061, -122.070462]} icon={GetIcon(200, "test1")}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
  );
}

export default App;
