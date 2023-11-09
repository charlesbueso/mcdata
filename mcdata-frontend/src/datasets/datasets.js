import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../utils/header';
import './datasets.css';

const Body = () => {
  const [file, setFile] = useState(null);

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/datasetuploaded', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Handle success response here
      if (response.status === 200) {

        // Dataset upload success
        if (response.data === "Dataset uploaded to mcdata marketplace") {
          console.log(response.data)
        }
        // Dataset upload failed
        if (response.data === "Couldn't upload dataset") {
          console.log(response.data)
        }
        // Dataset validation failed
        if (response.data === "Couldn't validate dataset") {
          console.log(response.data)
        }

       }
      
      
    } catch (error) {
      // Handle error response here
      // This means the POST request failed (error 400)
      console.log(error)
    }
  };

  return (
    <header className='data-body-text'>
      <h1>
        Datasets
      </h1>
        <label htmlFor="select-file" className="select-file-label" onChange={handleFileUpload}>
        <h1 className="select-file-prompt">Sell your dataset!</h1>
          <input id="select-file" type="file" onChange={(e) => setFile(e.target.files[0])} />
        </label>
      <button onClick={handleFileUpload}>Upload</button>
    </header>
  );
};

export const Footer = () => {
  /* Currently sending all to the same homepage for testing */
  return (
    <div className="footer">
      <nav className="footer-buttons">
        <Link to="/datasethomepage">Dataset 0</Link>
        <Link to="/datasethomepage">Dataset 1</Link>
        <Link to="/datasethomepage">Dataset 2</Link>
        <Link to="/datasethomepage">Dataset 3</Link>
        <Link to="/datasethomepage">Dataset 4</Link>
        </nav>
      <Outlet/>
    </div>
  );
};

export const DataPage = () => {
    return (
      <div className='data-page'>
        <Header />
        <Body />
        <Footer />
      </div>
    );
  };