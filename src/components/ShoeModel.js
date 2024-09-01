import '../index.css';
import {Suspense, useRef,useState ,forwardRef} from 'react'
import { Canvas} from '@react-three/fiber'
import {OrbitControls, useGLTF} from '@react-three/drei'
import html2canvas from 'html2canvas'
import PaymentFormModal from './PaymentFormModal';

const Model = forwardRef((props, ref) => {
  const group = useRef();
  const { nodes, materials } = useGLTF('/shoe_model/shoe.gltf');

  return (
    <group ref={group} {...props} dispose={null} scale={3}>
      <mesh geometry={nodes.shoe.geometry} material={materials.laces} material-color={props.customColors.laces}/>
      <mesh geometry={nodes.shoe_1.geometry} material={materials.mesh} material-color={props.customColors.mesh}/>
      <mesh geometry={nodes.shoe_2.geometry} material={materials.caps} material-color={props.customColors.soul}/>
      <mesh geometry={nodes.shoe_3.geometry} material={materials.inner}material-color={props.customColors.soul} />
      <mesh geometry={nodes.shoe_4.geometry} material={materials.sole} material-color={props.customColors.soul}/>
      <mesh geometry={nodes.shoe_5.geometry} material={materials.stripes}material-color={props.customColors.stripes} />
      <mesh geometry={nodes.shoe_6.geometry} material={materials.band} material-color={props.customColors.stripes}/>
      <mesh geometry={nodes.shoe_7.geometry} material={materials.patch} material-color={props.customColors.soul}/>
    </group>
  )
})


function ShoeModel() {

  const [capturedImage, setCapturedImage] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false); 

  const canvasRef = useRef(null);
  const modelSceneRef = useRef(null);



    const initialColors = {
      laces: '#ffffff',
      mesh: '#ffffff',
      stripes: '#ffffff',
      soul: '#ffffff',
    };

    const resetColors = () => {
      setLaces(initialColors.laces);
      setMesh(initialColors.mesh);
      setStripes(initialColors.stripes);
      setSoul(initialColors.soul);
    };
    const [laces, setLaces] = useState(initialColors.laces);
  const [mesh, setMesh] = useState(initialColors.mesh);
  const [stripes, setStripes] = useState(initialColors.stripes);
  const [soul, setSoul] = useState(initialColors.soul);

  async function captureScreenshot() {
    const canvasContainer = document.getElementById('canvas-container');
  
    if (!canvasContainer) {
      console.error("Canvas container not found.");
      setLoading(false)
      return;
    }
  
    try {
      // Capture the entire container including the 3D scene
      const canvas = await html2canvas(canvasContainer);
  
      // Now you can use the canvas as needed.
      // For example, you can convert it to a data URL or append it to the DOM.
      const dataURL = canvas.toDataURL();
      console.log(dataURL);
      setCapturedImage(dataURL)
    } catch (error) {
      console.error('Error capturing the screenshot:', error);
    }
    setLoading(false)
    setShowPaymentModal(true)
  }
  
  

  function handlePaymentModalClose() {
    setShowPaymentModal(false);
  }


  return (
    <>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md p-4 bg-white rounded-md shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <div id='canvas-container' className="relative w-80 h-80">
          <Canvas gl={{preserveDrawingBuffer:true}} ref={canvasRef}>

                <Suspense fallback={null}>
                  <ambientLight />
                  <spotLight
                    intensity={0.9}
                    angle={0.1}
                    penumbra={1}
                    position={[10, 15, 10]}
                    castShadow
                  />
                  <Model customColors={{ mesh, stripes, soul, laces }} ref={modelSceneRef} />
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
            <div>
              <input
                type="color"
                id="stripes"
                name="stripes"
                value={stripes}
                onChange={(e) => setStripes(e.target.value)}
                className="appearance-none w-full h-10 px-4 py-2 bg-white border rounded-lg"
              />
              <label htmlFor="stripes" className="block mt-2 text-gray-700">
                Stripes
              </label>
            </div>
            <div>
              <input
                type="color"
                id="soul"
                name="soul"
                value={soul}
                onChange={(e) => setSoul(e.target.value)}
                className="appearance-none w-full h-10 px-4 py-2 bg-white border rounded-lg"
              />
              <label htmlFor="soul" className="block mt-2 text-gray-700">
                Soul
              </label>
            </div>
            <div>
              <input
                type="color"
                id="laces"
                name="laces"
                value={laces}
                onChange={(e) => setLaces(e.target.value)}
                className="appearance-none w-full h-10 px-4 py-2 bg-white border rounded-lg"
              />
              <label htmlFor="laces" className="block mt-2 text-gray-700">
                Laces
              </label>
            </div>
          </div>
          <button
            onClick={resetColors}
            className="w-full px-4 py-2 mt-4 text-white bg-gray-600 rounded-md hover:bg-gray-700"
          >
            Reset Colors
          </button>
          <button
        onClick={() => {
          setLoading(true); 
          captureScreenshot();
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
      {/* PaymentFormModal */}
      {showPaymentModal && (
              <PaymentFormModal capturedImage={capturedImage} onClose={handlePaymentModalClose} />
            )}</div>
      </div>
    </div>

    </>
  );
}

export default ShoeModel;
