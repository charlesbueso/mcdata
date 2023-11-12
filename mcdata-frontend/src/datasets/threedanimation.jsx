import { BackSide } from "three";
import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { Punk } from "../threecomponents/Punk"

export const Experience = () => {

    const map = useTexture("/textures/psychedelic_ai.jpg")

    return (
        <>
        <OrbitControls />
        <ambientLight intensity={.5} />
        <Environment preset="sunset" />
        <mesh>
            <Punk scale={1.5} position-y={-1}/>
            <sphereGeometry args={[5,64,64]} />
            <meshStandardMaterial map={map} side={BackSide} />
        </mesh>
        </>
    )
}