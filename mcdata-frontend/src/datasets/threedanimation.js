import { SphereGeometry, MeshStandardMaterial } from "three";
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Environment, OrbitControls } from "@react-three/drei";

export function Experience(props) {
  const texture = useLoader(TextureLoader, "/textures/psychedelic_ai.jpg");

  const geometry = new SphereGeometry(1, 32, 32);
  const material = new MeshStandardMaterial({ map: texture });

  return (
    <group {...props}>
      <ambientLight intensity={.5} />
      <Environment preset="sunset" />
      <OrbitControls />
      <mesh geometry={geometry} material={material} />
    </group>
  );
}