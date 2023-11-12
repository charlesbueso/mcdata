/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 .\public\models\Witch.gltf -o src/threecomponents/Witch.jsx -r public 
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Witch(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/Witch.gltf')
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
          <group name="Witch_Body">
            <skinnedMesh name="Cube040" geometry={nodes.Cube040.geometry} material={materials.Skin} skeleton={nodes.Cube040.skeleton} />
            <skinnedMesh name="Cube040_1" geometry={nodes.Cube040_1.geometry} material={materials.Brown2} skeleton={nodes.Cube040_1.skeleton} />
            <skinnedMesh name="Cube040_2" geometry={nodes.Cube040_2.geometry} material={materials.Purple} skeleton={nodes.Cube040_2.skeleton} />
            <skinnedMesh name="Cube040_3" geometry={nodes.Cube040_3.geometry} material={materials.Gold} skeleton={nodes.Cube040_3.skeleton} />
          </group>
          <skinnedMesh name="Witch_Feet" geometry={nodes.Witch_Feet.geometry} material={materials.Brown2} skeleton={nodes.Witch_Feet.skeleton} />
          <group name="Witch_Head">
            <skinnedMesh name="Cube014" geometry={nodes.Cube014.geometry} material={materials.Skin} skeleton={nodes.Cube014.skeleton} />
            <skinnedMesh name="Cube014_1" geometry={nodes.Cube014_1.geometry} material={materials.Purple} skeleton={nodes.Cube014_1.skeleton} />
            <skinnedMesh name="Cube014_2" geometry={nodes.Cube014_2.geometry} material={materials.Brown} skeleton={nodes.Cube014_2.skeleton} />
            <skinnedMesh name="Cube014_3" geometry={nodes.Cube014_3.geometry} material={materials.Gold} skeleton={nodes.Cube014_3.skeleton} />
            <skinnedMesh name="Cube014_4" geometry={nodes.Cube014_4.geometry} material={materials.Hair_Black} skeleton={nodes.Cube014_4.skeleton} />
          </group>
          <group name="Witch_Legs">
            <skinnedMesh name="Cube011" geometry={nodes.Cube011.geometry} material={materials.Purple} skeleton={nodes.Cube011.skeleton} />
            <skinnedMesh name="Cube011_1" geometry={nodes.Cube011_1.geometry} material={materials.Brown} skeleton={nodes.Cube011_1.skeleton} />
            <skinnedMesh name="Cube011_2" geometry={nodes.Cube011_2.geometry} material={materials.Gold} skeleton={nodes.Cube011_2.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/Witch.gltf')