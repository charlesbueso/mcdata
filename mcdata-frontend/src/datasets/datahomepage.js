import { Header } from '../utils/header';
import { Experience } from './threedanimation.jsx';
import { Canvas } from "@react-three/fiber";
import './datahomepage.css';


const HowToBox = () => {
  return (
    <div className='data-marketplace-features'>
      <div className='elevated-bar'>
        <h1 className='datasets-title'>Become a <span>Chunk</span></h1>

        <div className="text-boxes">
          <div className="text-box">
          <img src="icons/dashboard.png" alt="Left icon" />
            <h3 className="text-box-title">1. Collect data</h3>
            <p className="text-box-content">
              To become a chunk, go out and collect some interesting data.
            </p>
          </div>

          <div className="text-box">
          <img src="icons/buy.png" alt="Center icon" />
            <h3 className="text-box-title">2. Upload and validate</h3>
            <p className="text-box-content">
              We will validate your dataset and upload it to the mcdata marketplace.
            </p>
          </div>

          <div className="text-box">
          <img src="icons/financial-profit.png" alt="Right icon" />
            <h3 className="text-box-title">3. Get paid</h3>
            <p className="text-box-content">
              No fees, just get paid for your data - we will help you selling it.
            </p>
          </div>
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