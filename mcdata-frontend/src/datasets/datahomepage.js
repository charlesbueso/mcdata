import { Header } from '../utils/header';
import { Experience } from './threedanimation.jsx';
import { Canvas } from "@react-three/fiber";
import './datahomepage.css';


const HowToBox = () => {
  return (
    <div className='data-marketplace-features'>
      <div className='elevated-bar'>
        <h1 className='datasets-title'>Become a <span>Chunk</span></h1>
        <div className='feature-box'>
          <i className='fa-solid fa-users'></i>
          <p>1. Collect data that is interesting to you</p>
        </div>
        <div className='feature-box'>
          <i className='fa-solid fa-chart-line'></i>
          <p>2. Upload your dataset to mcdata</p>
        </div>
        <div className='feature-box'>
          <i className='fa-solid fa-cloud-download'></i>
          <p>3. Get paid</p>
        </div>
      </div>
    </div>
  );
};


export const DataHomepage = () => {
    return (
      <>
      <div className='grey-triangles'></div>
      <div className='grey-rectangle'></div>
      <div className='dataset-homepage'>
        <Header />
        <Canvas shadows camera={{ position:[0,0,10], fov:30}}>
          <Experience />
        </Canvas>
        <HowToBox />
        </div>
      </>
    );
  };