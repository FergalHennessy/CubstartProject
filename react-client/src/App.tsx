import React from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import L from 'leaflet'
import EXIF from 'exif-js';
import exifr from 'exifr';
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
      {"position": [37.869061, -122.270462], "size": 200, icon:"https://i.imgur.com/Yx0AZhV.jpg", "votes": 0},
      {"position": [37.769061, -122.470462], "size": 200, icon:"https://i.imgur.com/bM60k8T.jpg", "votes": 0},
      {"position" : [37.8750, -122.2555], "size": 200, icon:"https://i.imgur.com/nfXzOFg.jpeg", "votes": 6},
    ],
    imgsrc: "https://i.imgur.com/U7afLiO.png",
    innertext: "https://i.imgur.com/U7afLiO.png"
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

  getImagePost = () =>{
    axios.get('/api/imagePosts')
      .then((response) => {
        const data = response.data;
        this.setState({random: data});
        console.log('ImagePosts received!')
      })
      .catch(() => {
        alert('Error retrieving imagePosts!!');
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

  

  handleAdd = (ev) => {
    const formdata = new FormData()
    formdata.append("image", ev.target.files[0])
    
    /*
    EXIF.getData(ev.target.files[0], function(){
      console.log(EXIF.getTag(this, "SubjectLocation"));
    })*/
    exifr.gps(ev.target.files[0]).then(gps => console.log(gps), gps => console.log("failure to get gps"));

    fetch("https://api.imgur.com/3/image/", {
        method: "post",
        headers: {
            Authorization: "Client-ID 37112db4a630e40"
        },
        body: formdata
    }).then(data => data.json()).then(data => {
        this.state.imgsrc = data.data.link
        this.state.innertext = data.data.link
        this.forceUpdate();
    })
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
    this.forceUpdate();

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
  

  onClickPlus(index) {
      
    this.setState(state => ({locations : this.state.locations.map((location, smallindex) => Object.assign({}, location, {votes: smallindex==index? location.votes+1:location.votes}))}));
  }

  onClickMinus(index){
    this.setState(state => ({locations : this.state.locations.map((location, smallindex) => Object.assign({}, location, {votes: smallindex==index? location.votes-1:location.votes}))}));
  }
  
  render(){
    
  return (
    <>
    
    <MapContainer center={[37.869061, -122.270462]} zoom={13} scrollWheelZoom={true}>
        
    

    

    <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
    {this.state.locations.map((location, index)=>(
      <Marker position={location.position as [number, number]} icon={GetIcon(300, "logo1")}>
          <Popup>
            <div><p>Votes for this landscape: {location.votes} </p>
            <img src={location.icon} height="200"/><br/>
            <button onClick={() => this.onClickPlus(index)}>up</button>
             <button onClick={()=> this.onClickMinus(index)}>down</button></div>
            
         </Popup>
     </Marker>
    ))}
    




</MapContainer>
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





        <div className = "blog-">
          {this.displayBlogPost(this.state.posts)}
        </div>
      
        
      </>
  );
}
}

export default App;
