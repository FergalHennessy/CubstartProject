import React from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import L from 'leaflet'
import { createLogicalOr } from 'typescript';
import { logDOM } from '@testing-library/react';
import axios from 'axios';

function GetIcon(_iconSize: any, _whichIcon: string){
  return L.icon({
    iconUrl: require("./Images/" + _whichIcon + ".png"),
    iconSize: _iconSize
  })
}


class App extends React.Component {

  state={
    title: '',
    body: '',
    posts:[],
    locations: [
      {"position": [37.869061, -122.270462], "size": 200, icon:"test", "votes": 0},
      {"position": [37.769061, -122.470462], "size": 200, icon:"test1", "votes": 0} 
    ]
  };




  componentWillMount = ()=>{
    this.getBlogPost();
  }

  getBlogPost = () =>{
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        this.setState({posts: data});
        console.log('Data has been received!!');
      })
      .catch(() => {
        alert('Error retrieving data!!!');
      })
  }

  displayBlogPost = (posts) =>{
    if(!posts.length) return null;

    return posts.map((post, index) =>(
      <div key={index}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    )
    )
  }

  
  
  handleChange=({target}) =>{
    const{name, value} = target;

    this.setState({
      [name]: value
      
    })
  }
  submit = (event) =>{
    event.preventDefault();
    const payload = {
      title: this.state.title,
      body: this.state.body
    };

    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    }).then(() => {
      console.log('Data sent to server');
    }).catch(() =>{
      console.log('Internal server error');
    });
  }
  
  
  render(){
    console.log('State: ', this.state);
  return (
    <>
    
    <MapContainer center={[37.869061, -122.270462]} zoom={13} scrollWheelZoom={true}>
        
    

    

    <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
    {this.state.locations.map((location)=>(
      <Marker position={location.position as [number, number]} icon={GetIcon(300, "logo1")}>
          <Popup>
            <div><p>Votes for this landscape: {location.votes}</p></div>
         </Popup>
     </Marker>
    ))}
    




</MapContainer>
<img src="https://i.imgur.com/U7afLiO.png" id="img" height="200px"/>
<p id="url"></p>
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
          <input className="file" type="file" id="img-upload" accept="image/*" title=" " />
          </div>
          <button>Submit</button>
        </form>





        <div className = "blog-">
          {this.displayBlogPost(this.state.posts)}
        </div>

        
      </>
  );
}
}

export default App;
