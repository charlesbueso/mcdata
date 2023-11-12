import { BackSide, DoubleSide } from "three";
import { Environment, MeshPortalMaterial, OrbitControls, RoundedBox, useTexture } from "@react-three/drei";
import { Punk } from "../threecomponents/Punk"
import { Adventurer } from "../threecomponents/Adventurer";
import { Witch } from "../threecomponents/Witch";


export const Experience = () => {

    return (
        <>
        <OrbitControls />
        <ambientLight intensity={.5} />
        <Environment preset="sunset" />
        <MonsterStage texture={"/textures/psychedelic_ai.jpg"}>
            <Adventurer scale={1.2} position-y={-1.3}/>
        </MonsterStage>
        <MonsterStage texture={"/textures/cyberpunk_big_data.jpg"} position-x={-2.5} rotation-y={Math.PI / 8}>
            <Punk scale={1.2} position-y={-1.3}/>
        </MonsterStage>
        <MonsterStage texture={"/textures/sky_dome_futuristic.jpg"} position-x={2.5} rotation-y={-Math.PI / 8}>
            <Witch scale={1.2} position-y={-1.3}/>
        </MonsterStage>
        </>
    )
}

const MonsterStage = ({children, texture, ...props}) => {

    const map = useTexture(texture)

    return (
    <group {...props}>
        <RoundedBox args={[2,3,0.1]}>
            <MeshPortalMaterial side={DoubleSide}>
                <ambientLight intensity={1} />
                <Environment preset="sunset" />
                {children}
                <mesh>
                <sphereGeometry args={[5,64,64]} />
                <meshStandardMaterial map={map} side={BackSide} />
                </mesh>
            </MeshPortalMaterial>
        </RoundedBox>
    </group>)
}