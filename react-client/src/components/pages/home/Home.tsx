import Topbar from "../../topbar/Topbar";
//import Sidebar from "../../components/sidebar/Sidebar";
//import Feed from "../../components/feed/Feed";
//import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";
import React, {useState} from 'react';
//import './App.css';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import EXIF from 'exif-js';
import exifr from 'exifr';
import axios from 'axios';

function GetIcon(_iconSize: any, _whichIcon: string){
  return L.icon({
    iconUrl: require("../../../Images/" + _whichIcon + ".png"),
    iconSize: _iconSize
  })
}

export default function Home() {
  return (
    <>
    <Topbar/>
  <div className = "homeContainer">


    {/*MAP PORTION*/}
    <MapContainer center={[37.869061, -122.270462]} zoom={13} scrollWheelZoom={true}>
        
    <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
    {this.state.locations.map((location, index)=>(
      <Marker position={location.position as L.LatLngExpression} icon={GetIcon(100, "logo1")} key={index}>
          <Popup>
            <div><p>Votes for this landscape: {location.votes} </p>
            <img src={location.icon} height="200"/><br/>
            <button onClick={() => this.onClickPlus(index)}>up</button>
             <button onClick={()=> this.onClickMinus(index)}>down</button></div>
         </Popup>
     </Marker>
    ))}
      </MapContainer>


{/*POSTING PORTION*/}

<h1>Posting to website</h1>
<img src={this.state.imgsrc} id="img" height="200px"/>
<p id="url">{this.state.innertext}</p>
        <form onSubmit={this.submit} action="/upload" method="post" encType="multipart/form-data">
          <div className="form-input">
            <input 
              type="text"
              name="title"
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <textarea
              placeholder="body"
              name="body"
              cols={30}
              rows={10}
              value={this.state.body}
              onChange={this.handleChange}
            >
              
            </textarea>
          </div>
          <div className="form-input">
          <input type="file" id="img-upload file" accept="image/*" title=" " onChange={this.handleAdd}/>
          </div>
          <button>Submit</button>
        </form>

      
      </div>
    </>
  );
}
