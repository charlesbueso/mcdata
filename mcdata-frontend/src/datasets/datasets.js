import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import { Gallery } from 'react-grid-gallery';
import { Header } from '../utils/header';
import './datasets.css';

const imageThumbnailWidth = 40;
const imageThumbnailHeight = 40;

const images1 = [
  {
    src: '/surrealism0.jpeg',
    alt: 'Surrealism Image 1',
    caption: 'Pune tech workers under 30',
    width: imageThumbnailWidth,
    height: imageThumbnailHeight,
  },
  {
    src: '/surrealism1.jpg',
    alt: 'Surrealism Image 2',
    caption: 'Medical images of rare diseases',
    width: imageThumbnailWidth,
    height: imageThumbnailHeight,
  },
  {
    src: '/surrealism2.jpeg',
    alt: 'Surrealism Image 3',
    caption: 'Behavior of users in virtual worlds',
    width: imageThumbnailWidth,
    height: imageThumbnailHeight,
  },
];

const images2 = [
  {
    src: '/surrealism3.jpg',
    alt: 'Surrealism Image 4',
    caption: 'Effectiveness of new drugs',
    width: imageThumbnailWidth,
    height: imageThumbnailHeight,
  },
  {
    src: '/surrealism4.jpg',
    alt: 'Surrealism Image 5',
    caption: 'Dreams of people from different cultures',
    width: imageThumbnailWidth,
    height: imageThumbnailHeight,
  },
];


const GalleryGrid = ({ images, maxRows, rowHeight, margin, enableImageSelection, className }) => {
  return (
    <div className={`gallery-wrapper ${className}`}>
      <Gallery
        images={images}
        maxRows={maxRows}
        rowHeight={rowHeight}
        margin={margin}
        enableImageSelection={enableImageSelection}
      />
    </div>
  );
};

const DatasetHeading = () => {
  return (
    <header className='data-body-text'>
      <h2>The Data</h2>
      <h3>mcdata empowers your data-driven journey with a diverse and trusted marketplace of datasets.</h3>
    </header>
  );
};

const DatasetUpload = () => {
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
    <div className='data-upload'>
      <label htmlFor="select-file" className="select-file-label" onChange={handleFileUpload}>
        <h1 className="select-file-prompt">Sell your dataset!</h1>
          <input id="select-file" type="file" onChange={(e) => setFile(e.target.files[0])} />
      </label>
      <button onClick={handleFileUpload}>Upload</button>
    </div>
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

export const DatasetHomepage = () => {
  return (
    <div className='data-page'>
      <Header />
      <GalleryGrid
        className='gallery-wrapper-1'
        images={images1}
        maxRows={3}
        rowHeight={130}
        margin={60}
        enableImageSelection={false}
      />
      <GalleryGrid
        className='gallery-wrapper-2'
        images={images2}
        maxRows={3}
        rowHeight={130}
        margin={60}
        enableImageSelection={false}
      />
      <DatasetHeading />
      <DatasetUpload />
      {/* <Footer /> */}
    </div>
  );
};