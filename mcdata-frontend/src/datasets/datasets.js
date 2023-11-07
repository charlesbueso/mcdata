import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './datasets.css';

const Header = () => {
    return (
      <div className="header">
        <img className="logo" src="/logo.png" alt="mcdata logo" />
        <nav className="buttons">
          <Link to="/">Home</Link>
          <Link to="/data">Data</Link>
          <Link to="/about">About</Link>
          <Link to="/account">Account</Link>
        </nav>
        <Outlet/>
      </div>
    );
  };

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
    } catch (error) {
      // Handle error response here
    }
  };

  return (
    <header className='data-body-text'>
      <h1>
        Datasets
      </h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleFileUpload}>Upload</button>
    </header>
  );
};

export const DataPage = () => {
    return (
      <div className='data-page'>
        <Header />
        <Body />
      </div>
    );
  };