import { Link, Outlet, useNavigate  } from 'react-router-dom';
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

// const Body = () => {
//     return(
//         <header className='data-body-text'>
//             <h1>
//                 Datasets
//             </h1>
//         </header>
//     )
// };

const Body = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    console.log("test");

    try {
      const response = await axios.post('/datasetuploaded', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },  
      });

      const data = await response.json();
      console.log(data);
      console.log("test");

      if (data.status === 'success') {
        return (
          navigate("/about")
        );
      } else {
        // Handle error response here
      }

    } catch (error) {
        return console.log("Something went wrong with the server [POST].");
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