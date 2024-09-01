


import React, { useRef , useState } from 'react'
import { useGLTF } from '@react-three/drei'
import {Suspense } from 'react'
import { Canvas} from '@react-three/fiber'
import {OrbitControls } from '@react-three/drei'

 function Model(props) {
  const { nodes, materials } = useGLTF('/tshirt_model/scene.gltf')
  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.039}>
        <mesh geometry={nodes.Object_4.geometry} material={materials.FABRIC_1_FRONT_4193} />
        <mesh geometry={nodes.Object_5.geometry} material={materials.FABRIC_1_FRONT_4193} />
        <mesh geometry={nodes.Object_6.geometry} material={materials.FABRIC_1_FRONT_4193} />
        <mesh geometry={nodes.Object_7.geometry} material={materials.FABRIC_1_FRONT_4193} />
      </group>
    </group>
  )
}

useGLTF.preload('/tshirt_model/scene.gltf')


export default function TshirtCustomizer() {
    const [mesh, setMesh] = useState('#FF5733');
    const [loading, setLoading] = useState(false);
    const canvasRef = useRef(null);
  
    const customColor = {
      mesh,
    };
  
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-md p-4 bg-white rounded-md shadow-lg">
          <div className="flex flex-col items-center space-y-4">
            <div id="canvas-container" className="relative w-80 h-80">
              <Canvas gl={{ preserveDrawingBuffer: true }} ref={canvasRef}>
                <Suspense fallback={null}>
                  <ambientLight />
                  <spotLight intensity={0.9} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
                  <Model customColor={customColor} />
                  <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                </Suspense>
              </Canvas>
            </div>
            <h2 className="text-2xl font-bold">Color chooser</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="color"
                  id="mesh"
                  name="mesh"
                  value={mesh}
                  onChange={(e) => setMesh(e.target.value)}
                  className="appearance-none w-full h-10 px-4 py-2 bg-white border rounded-lg"
                />
                <label htmlFor="mesh" className="block mt-2 text-gray-700">
                  Main
                </label>
              </div>
            </div>
            <button
              // onClick={resetColors}
              className="w-full px-4 py-2 mt-4 text-white bg-gray-600 rounded-md hover:bg-gray-700"
            >
              Reset Colors
            </button>
            <button
              onClick={() => {
                setLoading(true);
              }}
              className="w-full px-4 py-2 mt-4 text-white bg-gray-600 rounded-md hover:bg-gray-700"
            >
              Capture Screenshot and Proceed to Payment
            </button>
            {loading && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="w-full max-w-md p-4 bg-white rounded-md shadow-lg">
                  <h2 className="text-2xl font-bold mb-4">Processing Screenshot...</h2>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  