import { BackSide, DoubleSide } from "three";
import { Environment, MeshPortalMaterial, OrbitControls, RoundedBox, useTexture } from "@react-three/drei";
import { Punk } from "../threecomponents/Punk"

export const Experience = () => {

    const map = useTexture("/textures/psychedelic_ai.jpg")

    return (
        <>
        <OrbitControls />
        <ambientLight intensity={.5} />
        <Environment preset="sunset" />
        <RoundedBox args={[2,3,0.1]}>
            <MeshPortalMaterial side={DoubleSide}>
                <ambientLight intensity={1} />
                <Environment preset="sunset" />
                <Punk scale={1.2} position-y={-1.3}/>
                <mesh>
                <sphereGeometry args={[5,64,64]} />
                <meshStandardMaterial map={map} side={BackSide} />
                </mesh>
            </MeshPortalMaterial>
        </RoundedBox>
        </>
    )
}

// const MonsterStage = ({...props}) => {
//     return (
//     <group {...props}>

//     </group>)
// }