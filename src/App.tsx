import React from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
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


  const locations  = [
    {"position": [37.869061, -122.270462], "size": 200, icon:"test"},
    {"position": [37.769061, -122.470462], "size": 200, icon:"test1"} 
  ]
  

  return (
    <>
    <MapContainer center={[37.869061, -122.270462]} zoom={13} scrollWheelZoom={true}>
        
    



    {locations.map((location)=>(
      <Marker position={location.position as [number, number]} icon={GetIcon(location.size, location.icon)}>
          <Popup>
            <div>testing</div>
         </Popup>
     </Marker>
    ))}
        
    




</MapContainer>


    <label className="custom-file-upload" z-index={1000}>
            <input type="file" id="img-upload" accept="image/*" title=" "/>
            Upload Image
        </label>
      </>
  );
}

export default App;
