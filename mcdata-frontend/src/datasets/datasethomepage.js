import { Header } from '../utils/header';
import { Experience } from './threedanimation';
import { Canvas } from "@react-three/fiber";
import './datasethomepage.css';


export const DatasetHomepage = () => {
    return (
      <div className='dataset-homepage'>
        <Header />
        <Canvas shadows camera={{ position:[0,0,10], fov:30}}>
          <Experience />
        </Canvas>
      </div>
    );
  };