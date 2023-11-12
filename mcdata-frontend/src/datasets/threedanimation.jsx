import { BackSide, DoubleSide, Vector3 } from "three";
import React, { useEffect, useRef, useState } from 'react'
import { Environment, MeshPortalMaterial, OrbitControls, RoundedBox, useTexture, Text, CameraControls } from "@react-three/drei";
import { Punk } from "../threecomponents/Punk"
import { Adventurer } from "../threecomponents/Adventurer";
import { Witch } from "../threecomponents/Witch";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath"


export const Experience = () => {

    const [active, setActive] = useState(null);
    const controlsRef = useRef();
    const scene = useThree((state) => state.scene);

    useEffect(() => {
        if (active) {
            const targetPosition = new Vector3();
            scene.getObjectByName(active).getWorldPosition(targetPosition);
            controlsRef.current.setLookAt(
                0,
                0,
                5,
                targetPosition.x,
                targetPosition.y,
                targetPosition.z,
                true,
            )
        } else {
            controlsRef.current.setLookAt(
                0,
                0,
                10,
                0,
                0,
                0,
                true,
            )
        }
    }, [active]);

    return (
        <>
        <CameraControls ref={controlsRef}/>
        <ambientLight intensity={.5} />
        <Environment preset="sunset" />

        <MonsterStage 
            texture={"/textures/psychedelic_ai.jpg"} 
            name="Mark" 
            color={"#07194c"} 
            active={active}
            setActive={setActive}>
                <Adventurer scale={1.2} position-y={-1}/>
        </MonsterStage>

        <MonsterStage 
            texture={"/textures/cyberpunk_big_data.jpg"} 
            position-x={-2.5} 
            rotation-y={Math.PI / 8}  
            name="Charles" 
            color={"#a9162a"}
            active={active}
            setActive={setActive}>
                <Punk scale={1.2} position-y={-1}/>
        </MonsterStage>

        <MonsterStage 
            texture={"/textures/sky_dome_futuristic.jpg"} 
            position-x={2.5} 
            rotation-y={-Math.PI / 8}
            name="Briz" 
            color={"#714837"}
            active={active}
            setActive={setActive}>    
                <Witch scale={1.2} position-y={-1}/>
        </MonsterStage>
        </>
    )
}

const MonsterStage = ({children, texture, name, color, active, setActive, ...props}) => {

    const map = useTexture(texture);
    const portalMaterial = useRef();

    useFrame((_state, delta) => {
        const worldOpen = active === name;
        easing.damp(portalMaterial.current, "blend", worldOpen ? 1 : 0, 0.2, delta)
    })
    
    return (
    <group {...props}>
        <Text font="\fonts\DMSans\DMSans-italic.ttf" fontSize={0.3} position={[0, -1.4, 0.051]} anchorY={"bottom"}>
            {name}
            <meshBasicMaterial color={color} toneMapped={false}/>
        </Text>
        <RoundedBox 
        name={name}
        args={[2,3,0.1]} 
        onDoubleClick={() => setActive(active === name ? null : name)}> 
            <MeshPortalMaterial side={DoubleSide} ref={portalMaterial}>
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