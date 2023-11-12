import { BackSide, DoubleSide, Vector3 } from "three";
import React, { useEffect, useRef, useState } from 'react'
import { Environment, MeshPortalMaterial, RoundedBox, useTexture, Text, CameraControls, useCursor } from "@react-three/drei";
import { Punk } from "../threecomponents/Punk"
import { Adventurer } from "../threecomponents/Adventurer";
import { Witch } from "../threecomponents/Witch";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath"


export const Experience = () => {

    const [active, setActive] = useState(null);
    const [hovered, setHovered] = useState(null);
    useCursor(hovered);
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

    //TODO: Refactor name="" and hovered in Adventurer,Punk,Witch
    return (
        <>
        <CameraControls ref={controlsRef} maxPolarAngle={Math.PI / 1.6} minPolarAngle={Math.PI / 3}/>
        <ambientLight intensity={.5} />
        <Environment preset="sunset" />

        <MonsterStage 
            texture={"/textures/psychedelic_ai.jpg"} 
            name="Mark" 
            color={"#07194c"} 
            active={active}
            setActive={setActive}
            hovered={hovered}
            setHovered={setHovered}>
                <Adventurer scale={1.1} position-y={-0.9} hovered={hovered === "Mark"}/>
        </MonsterStage>

        <MonsterStage 
            texture={"/textures/cyberpunk_big_data.jpg"} 
            position-x={-2.5} 
            rotation-y={Math.PI / 8}  
            name="Charles" 
            color={"#a9162a"}
            active={active}
            setActive={setActive}
            hovered={hovered}
            setHovered={setHovered}>
                <Punk scale={1.1} position-y={-0.9} hovered={hovered === "Charles"}/>
        </MonsterStage>

        <MonsterStage 
            texture={"/textures/sky_dome_futuristic.jpg"} 
            position-x={2.5} 
            rotation-y={-Math.PI / 8}
            name="Briz" 
            color={"#714837"}
            active={active}
            setActive={setActive}
            hovered={hovered}
            setHovered={setHovered}>
                <Witch scale={1.1} position-y={-0.9} hovered={hovered === "Briz"}/>
        </MonsterStage>
        </>
    )
}

const MonsterStage = ({children, texture, name, color, active, setActive, hovered, setHovered, ...props}) => {

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
        onDoubleClick={() => setActive(active === name ? null : name)}
        onPointerEnter={() => setHovered(name)}
        onPointerLeave={() => setHovered(null)}> 
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