/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 .\public\models\Adventurer.gltf -o src/threecomponents/Adventurer.jsx -r public 
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Adventurer(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/Adventurer.gltf')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    actions["Idle"].reset().fadeIn(0.5).play();
    return () => actions["Idle"].fadeOut(0.5);
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Adventurer_Body">
            <skinnedMesh name="Cube063" geometry={nodes.Cube063.geometry} material={materials.Skin} skeleton={nodes.Cube063.skeleton} />
            <skinnedMesh name="Cube063_1" geometry={nodes.Cube063_1.geometry} material={materials.Green} skeleton={nodes.Cube063_1.skeleton} />
            <skinnedMesh name="Cube063_2" geometry={nodes.Cube063_2.geometry} material={materials.LightGreen} skeleton={nodes.Cube063_2.skeleton} />
          </group>
          <group name="Adventurer_Feet">
            <skinnedMesh name="Cube052" geometry={nodes.Cube052.geometry} material={materials.Grey} skeleton={nodes.Cube052.skeleton} />
            <skinnedMesh name="Cube052_1" geometry={nodes.Cube052_1.geometry} material={materials.Black} skeleton={nodes.Cube052_1.skeleton} />
          </group>
          <group name="Adventurer_Head">
            <skinnedMesh name="Cube039" geometry={nodes.Cube039.geometry} material={materials.Skin} skeleton={nodes.Cube039.skeleton} />
            <skinnedMesh name="Cube039_1" geometry={nodes.Cube039_1.geometry} material={materials.Eyebrows} skeleton={nodes.Cube039_1.skeleton} />
            <skinnedMesh name="Cube039_2" geometry={nodes.Cube039_2.geometry} material={materials.Hair} skeleton={nodes.Cube039_2.skeleton} />
            <skinnedMesh name="Cube039_3" geometry={nodes.Cube039_3.geometry} material={materials.Eye} skeleton={nodes.Cube039_3.skeleton} />
          </group>
          <group name="Adventurer_Legs">
            <skinnedMesh name="Cube020" geometry={nodes.Cube020.geometry} material={materials.Brown} skeleton={nodes.Cube020.skeleton} />
            <skinnedMesh name="Cube020_1" geometry={nodes.Cube020_1.geometry} material={materials.Brown2} skeleton={nodes.Cube020_1.skeleton} />
          </group>
          <group name="Backpack">
            <skinnedMesh name="Plane" geometry={nodes.Plane.geometry} material={materials.Brown} skeleton={nodes.Plane.skeleton} />
            <skinnedMesh name="Plane_1" geometry={nodes.Plane_1.geometry} material={materials.LightGreen} skeleton={nodes.Plane_1.skeleton} />
            <skinnedMesh name="Plane_2" geometry={nodes.Plane_2.geometry} material={materials.Gold} skeleton={nodes.Plane_2.skeleton} />
            <skinnedMesh name="Plane_3" geometry={nodes.Plane_3.geometry} material={materials.Green} skeleton={nodes.Plane_3.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/Adventurer.gltf')