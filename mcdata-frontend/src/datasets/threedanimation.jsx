import { BackSide, DoubleSide, MeshBasicMaterial } from "three";
import { Environment, MeshPortalMaterial, OrbitControls, RoundedBox, useTexture, Text } from "@react-three/drei";
import { Punk } from "../threecomponents/Punk"
import { Adventurer } from "../threecomponents/Adventurer";
import { Witch } from "../threecomponents/Witch";


export const Experience = () => {

    return (
        <>
        <OrbitControls />
        <ambientLight intensity={.5} />
        <Environment preset="sunset" />

        <MonsterStage 
            texture={"/textures/psychedelic_ai.jpg"} 
            name="Mark" 
            color={"#07194c"} >
                <Adventurer scale={1.2} position-y={-1}/>
        </MonsterStage>

        <MonsterStage 
            texture={"/textures/cyberpunk_big_data.jpg"} 
            position-x={-2.5} 
            rotation-y={Math.PI / 8}  
            name="Charles" 
            color={"#a9162a"}>
                <Punk scale={1.2} position-y={-1}/>
        </MonsterStage>

        <MonsterStage 
            texture={"/textures/sky_dome_futuristic.jpg"} 
            position-x={2.5} 
            rotation-y={-Math.PI / 8}
            name="Briz" 
            color={"#714837"}>
                <Witch scale={1.2} position-y={-1}/>
        </MonsterStage>
        </>
    )
}

const MonsterStage = ({children, texture, name, color, ...props}) => {

    const map = useTexture(texture)

    return (
    <group {...props}>
        <Text font="\fonts\DMSans\DMSans.ttf" fontSize={0.3} position={[0, -1.4, 0.051]} anchorY={"bottom"}>
            {name}
            <meshBasicMaterial color={color} toneMapped={false}/>
        </Text>
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