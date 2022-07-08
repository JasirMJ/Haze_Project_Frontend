import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [imageUploadUrl, setImageUploadImageUrl] = useState('assets/images/image.png');
  const [imageProcessUrl, setImageProcessUrl] = useState("assets/images/processimage.png");
  const [loading, setloading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);

    setImageUploadImageUrl(URL.createObjectURL(e.target.files[0]))
  }

  const handleSubmit = (e) => {
    setImageProcessUrl('assets/images/processimage.png');
    setloading(true);



    e.preventDefault();
    console.log(file);

    var data = new FormData();
    data.append('file', file);

    var config = {
      method: 'post',
      url: 'http://localhost:8000/api/v1/dehaze/',
      data: data
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      if (response.data.status) {
        let dehaze = response.data.dehazed
        let img = "http://localhost:8000/"
        console.log("img is : ",img+dehaze)
        setImageProcessUrl(img+dehaze);
        // setImageProcessUrl(imageUploadUrl);
      }
      else {
        alert(response.data.message);
      }

    })
    .catch(function (error) {
      console.log(error);
      // setImageProcessUrl(imageUploadUrl);
      setImageProcessUrl('assets/images/dehaze.png');


    }).finally(function () {
      setloading(false);
    })



  }

  console.log("loading: ", loading);

  return (
    <span>
      <div>
        <div className="header"><strong> IMAGE DEHAZE</strong></div>
        <div className="container">
          <div className="left">
            <div className="upload">
              <img className="upload-img" src={imageUploadUrl} onChange={new Date()} />
            </div>
            <div className="file-choose ">
              <input className=" input-file button" type="file" onChange={handleFileChange} />
            </div>
          </div>
          <div className="center" onClick={handleSubmit} style={{ cursor: 'pointer' }}>
            {!loading ?
              <span className='center-content'>
                <i className="fas fa-sync process-btn" />
                <h1 >Click to Process</h1>
              </span>
              :
              <span className='center-content'>
                <i className="fas fa-sync fa-spin  process-btn" />
                <h1 >Processing </h1>
              </span>
            }


          </div>
          <div className="right">
            <div className="upload">
              <img onChange={new Date()} className="upload-img" src={imageProcessUrl+"?"+new Date()}  />
            </div>
            <a href={imageProcessUrl} target="_blank" download="dehazed" className="button">Download</a>
          </div>
        </div>
      </div>

    </span>
  );
}

export default App;
