import React, { Component } from 'react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import logo from './logo.png';
import axios from 'axios';
import './App.css';



class App extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      avatar: '',
      isUploading: false,
      progress: 0,
      avatarURL: '',
      photos: []
    }
  }

  componentDidMount() {

    console.log(process)
    axios.get("/api/get").then(r => {
      this.setState({ photos: r.data })
    }).catch(err => console.log(err))
  }

  addphoto() {

    let obj = {
      "longUrl": this.state.avatarURL
    }
    axios.post("/api/post", obj).then(results => {

      this.setState({ photos: results.data, avatarURL: '' })
    }).catch(err => console.log(err))
  }

  handleChangeUsername = (event) => this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = (progress) => this.setState({ progress });
  handleUploadError = (error) => {
    this.setState({ isUploading: false });
    console.error(error);
  }
  handleUploadSuccess = (filename) => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase.storage().ref('images').child(filename).getDownloadURL().then(url => {

      this.setState({
        avatarURL: url
      })
    });
  };
  render() {
    let av;
    if (this.state.avatarURL) {
      av = <div className="sample"  ><img src={this.state.avatarURL} alt="" /> </div>;
    }

    let photos = this.state.photos.map((item, i) => {
      return (<div className="card" key={i} >
        <div className="pic" style={{ backgroundImage: `url(${item.tinyurl})`, backgroundPosition: "center" }}  >
          <span className="caption" >
            <input type="text" value={item.tinyurl} />
          </span>


        </div>



      </div>)
    })


    return (
      <div className="app" >
        <span style={{ marginTop: "2vh" }} >BiggerPic</span>

        {av}

        <img style={{ cursor: "pointer" }} onClick={() => window.scrollTo(0, 0)} className="logo" src={logo} alt="" />
        <header>

          <label style={{ backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, pointer: 'cursor', display: "flex" }}>
            <FileUploader

              accept="image/*"
              name="thumbnail"
              randomizeFilename
              storageRef={firebase.storage().ref('images')}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            />
            <button onClick={() => this.addphoto()} >Submit</button>
          </label>

        </header>
        <div className="container" >

          <div className="photoContainer" >{photos}</div>

        </div>

      </div>
    );
  }
}

export default App;
