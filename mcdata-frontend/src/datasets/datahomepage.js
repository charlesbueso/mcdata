import { Header } from '../utils/header';
import { Experience } from './threedanimation';
import { Canvas } from "@react-three/fiber";
import './datahomepage.css';


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
      </div>
      {/* <div className='text-section'>
        <p>This is the text content that will appear below the canvas animation.</p>
      </div> */}
      </>
    );
  };