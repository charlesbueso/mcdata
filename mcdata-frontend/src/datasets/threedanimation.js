import { SphereGeometry, MeshStandardMaterial, BackSide } from "three";
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Environment, OrbitControls } from "@react-three/drei";
import { Punk } from "../threecomponents/Punk"

export function Experience(props) {
  const texture = useLoader(TextureLoader, "/textures/psychedelic_ai.jpg");
  const geometry = new SphereGeometry(5, 64, 64);
  const material = new MeshStandardMaterial({ map: texture, side: BackSide });

  return (
    <group {...props}>
      <ambientLight intensity={.5} />
      <Environment preset="sunset" />
      <OrbitControls />
      <mesh/>
      <Punk scale={1.3} position-y={-1}/>
      <mesh geometry={geometry} material={material} />
    </group>
  );
}


// import { SphereGeometry, MeshStandardMaterial, BackSide, PlaneGeometry } from "three";
// import { useLoader } from '@react-three/fiber'
// import { TextureLoader } from 'three/src/loaders/TextureLoader'
// import { Environment, MeshPortalMaterial, OrbitControls } from "@react-three/drei";
// import { Punk } from "../threecomponents/Punk"

// export function Experience(props) {
//   const texture = useLoader(TextureLoader, "/textures/psychedelic_ai.jpg");

//   const geometry = new SphereGeometry(5, 64, 64);
//   const material = new MeshStandardMaterial({ map: texture, side: BackSide });
//   const planegeometry = new PlaneGeometry(2,3);
//   const portalmaterial = MeshPortalMaterial;

//   portalmaterial.addPortal(
//     <Punk scale={1.3} position-y={-1}/>,
//     <mesh geometry={geometry} material={material} />
//   );

//   return (
//     <group {...props}>
//       <ambientLight intensity={.5} />
//       <Environment preset="sunset" />
//       <OrbitControls />
//       <mesh geometry={planegeometry} material={portalmaterial} />
//     </group>
//   );
// }