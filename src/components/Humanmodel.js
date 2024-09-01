import React, { useRef , useState, useEffect } from 'react'
import { useGLTF  } from '@react-three/drei'
import {Suspense } from 'react'
import { Canvas  } from '@react-three/fiber'
import {OrbitControls } from '@react-three/drei'
import ProductList from './productList'
import { TextureLoader } from 'three';
import * as THREE from 'three'


function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/women_model/woman.gltf');
  const [shirtTexture, setShirtTexture] = useState(null);
  const [pantsTexture, setPantsTexture] = useState(null);

  useEffect(() => {
    const textureLoader = new TextureLoader();
    textureLoader.load(props.selectedShirtImage, (texture) => {
      texture.flipY = true; // Adjust texture orientation if needed
      setShirtTexture(texture);
    });
    textureLoader.load(props.selectedPantsImage, (texture) => {
      texture.flipY = true; // Adjust texture orientation if needed
      setPantsTexture(texture);
    });
  }, [props.selectedShirtImage, props.selectedPantsImage]);
  
  const clippingPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  
  const material = new THREE.MeshPhysicalMaterial({
    map: shirtTexture,
    color: 0xffffff,
    roughness: 0.2,
    normalScale: new THREE.Vector2(2, 2), // Adjust the normal map scale as needed
    side: THREE.DoubleSide, // Make sure both sides are visible
    alphaTest: 0.5,
  });
  
  material.clippingPlanes = [clippingPlane];
  material.clipShadows = false;
  
  // Load the ambient occlusion map texture for the shirt
  const shirtOcclusionMapTexture = new TextureLoader().load(props.selectedShirtImage);
  material.aoMap = shirtOcclusionMapTexture;
  material.aoMapIntensity = 1; // Adjust the intensity as needed
  
  // Additional properties for fabric appearance
  material.normalMap = shirtOcclusionMapTexture; // Normal map for fabric detail
  material.normalScale.set(0.5, 0.5); // Adjust the normal map scale for fabric detail
  
  const pantsMaterial = new THREE.MeshStandardMaterial({
    map: pantsTexture,
    color: 0xffffff,
    roughness: 0.2,
    normalScale: new THREE.Vector2(2, 2), // Adjust the normal map scale as needed
    side: THREE.DoubleSide, // Make sure both sides are visible
  });
  
  pantsMaterial.clippingPlanes = [clippingPlane];
  pantsMaterial.clipShadows = false;
  
  // Load the ambient occlusion map texture for the pants
  const pantsOcclusionMapTexture = new TextureLoader().load(props.selectedPantsImage);
  pantsMaterial.aoMap = pantsOcclusionMapTexture;
  pantsMaterial.aoMapIntensity = 1; // Adjust the intensity as needed
  
  // Additional properties for fabric appearance
  pantsMaterial.normalMap = pantsOcclusionMapTexture; // Normal map for fabric detail
  pantsMaterial.normalScale.set(0.5, 1); // Adjust the normal map scale for fabric detail
  
  


    return (
      <group ref={group} {...props} dispose={null}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name="Mesh019"
            geometry={nodes.Mesh019.geometry}
            material={materials.Glasses}
            skeleton={nodes.Mesh019.skeleton}
            morphTargetDictionary={nodes.Mesh019.morphTargetDictionary}
            morphTargetInfluences={nodes.Mesh019.morphTargetInfluences}
          />
          <skinnedMesh
            name="Mesh019_1"
            geometry={nodes.Mesh019_1.geometry}
            material={materials.Eyes}
            skeleton={nodes.Mesh019_1.skeleton}
            morphTargetDictionary={nodes.Mesh019_1.morphTargetDictionary}
            morphTargetInfluences={nodes.Mesh019_1.morphTargetInfluences}
          />
          <skinnedMesh
            name="Mesh019_2"
            geometry={nodes.Mesh019_2.geometry}
            material={materials.Hair}
            skeleton={nodes.Mesh019_2.skeleton}
            morphTargetDictionary={nodes.Mesh019_2.morphTargetDictionary}
            morphTargetInfluences={nodes.Mesh019_2.morphTargetInfluences}
          />
          <skinnedMesh
            name="Mesh019_3"
            geometry={nodes.Mesh019_3.geometry}
            material={materials.Skin}
            // material-color = {props.customColors.hairs}
            skeleton={nodes.Mesh019_3.skeleton}
            morphTargetDictionary={nodes.Mesh019_3.morphTargetDictionary}
            morphTargetInfluences={nodes.Mesh019_3.morphTargetInfluences}
          />
          <skinnedMesh
            name="Mesh019_4"
            geometry={nodes.Mesh019_4.geometry}
            material={materials.Mouth}
            skeleton={nodes.Mesh019_4.skeleton}
            morphTargetDictionary={nodes.Mesh019_4.morphTargetDictionary}
            morphTargetInfluences={nodes.Mesh019_4.morphTargetInfluences}
          />
   <skinnedMesh
          name="Mesh019_5"
          geometry={nodes.Mesh019_5.geometry}
          material={material}
          skeleton={nodes.Mesh019_5.skeleton}
          morphTargetDictionary={nodes.Mesh019_5.morphTargetDictionary}
          morphTargetInfluences={nodes.Mesh019_5.morphTargetInfluences}
          receiveShadow
        />
        <skinnedMesh
          name="Mesh019_6"
          geometry={nodes.Mesh019_6.geometry}
          material={pantsMaterial}
          skeleton={nodes.Mesh019_6.skeleton}
          morphTargetDictionary={nodes.Mesh019_6.morphTargetDictionary}
          morphTargetInfluences={nodes.Mesh019_6.morphTargetInfluences}
        />

          <skinnedMesh
            name="Mesh019_7"
            geometry={nodes.Mesh019_7.geometry}
            material={materials.Shoes}
            skeleton={nodes.Mesh019_7.skeleton}
            morphTargetDictionary={nodes.Mesh019_7.morphTargetDictionary}
            morphTargetInfluences={nodes.Mesh019_7.morphTargetInfluences}
          />
          <skinnedMesh
            name="Mesh019_8"
            geometry={nodes.Mesh019_8.geometry}
            material={materials.Sole}
            skeleton={nodes.Mesh019_8.skeleton}
            morphTargetDictionary={nodes.Mesh019_8.morphTargetDictionary}
            morphTargetInfluences={nodes.Mesh019_8.morphTargetInfluences}
          />
          <skinnedMesh
            name="Mesh019_9"
            geometry={nodes.Mesh019_9.geometry}
            material={materials.Laces}
            skeleton={nodes.Mesh019_9.skeleton}
            morphTargetDictionary={nodes.Mesh019_9.morphTargetDictionary}
            morphTargetInfluences={nodes.Mesh019_9.morphTargetInfluences}
          />
        </group>
      </group>
    )
  }
  
  useGLTF.preload('/women_model/woman.gltf')

  
export default function Humanmodel(){

   
 
    const [selectedShirtImage, setSelectedShirtImage] = useState(null);
    const [selectedPantsImage, setSelectedPantsImage] = useState(null);

  
   

    return(
<>           <div className="flex bg-gray-200">
      {/* Product List */}
      <div className="w-1/4 p-4">
        <ProductList
          onProductClick={(type, imageUrl) => {
            if (type === 'selectedShirtImage') {
              setSelectedShirtImage(imageUrl);
            } else if (type === 'selectedPantsImage') {
              setSelectedPantsImage(imageUrl);
            }
          }}
        />
      </div>

      {/* 3D Model */}
      <div className="w-3/4 bg-gray-900">
  <div className="flex justify-center items-center h-screen">
    <div className="w-5/6 h-full max-h-96 bg-white rounded-lg shadow-lg">
      <Canvas
        className="w-full h-full"
        gl={{ alpha: true, clearColor: 'transparent' }}
        style={{ width: '100%', maxWidth: '1200px' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <spotLight intensity={0.9} angle={0.15} penumbra={1} position={[5, 10, 5]} castShadow />
          <Model selectedShirtImage={selectedShirtImage} selectedPantsImage={selectedPantsImage} />
          <OrbitControls enablePan enableZoom enableRotate />
        </Suspense>
      </Canvas>
    </div>
  </div>
</div>
    </div>
              </>

    );
}