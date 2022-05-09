
import { useRef, useState, useEffect} from 'react'
import { Canvas, extend} from '@react-three/fiber'
import {  OrbitControls,  useGLTF, PerspectiveCamera } from '@react-three/drei'
 
import { RectAreaLight } from 'lgl-tracer'
import { proxy, useSnapshot } from 'valtio'
import { HexColorPicker } from 'react-colorful'
 
import Axios from 'axios'

import Ntc from './ntc.js'
import './styles.css'
import { Modal } from 'antd';
import swal from 'sweetalert';


extend({ RectAreaLight })
const state = proxy({
  current: null,
  items: {
    Bout001: '#ffffff',
    Bridge: '#ffffff',
    Chincrest: '#ffffff',
    End_pin: '#ffffff',
    Eyelet: '#ffffff',
    Fingerboard: '#ffffff',
    Hair: '#ffffff',
    Pegs: '#ffffff',
    Scroll_and_neck: '#ffffff',
    Stick: '#ffffff',
    Strings: '#ffffff',
    Tailpiece: '#ffffff',
    Tuners: '#ffffff',
    Violin001: '#ffffff'
  }
})

export default function App() {
  const cameraRef = useRef(null)
  const group = useRef()
  const snap = useSnapshot(state)

  // Animate model
  const [violonBody, setviolonBody] = useState('')
  const [violonStick, setviolonStick] = useState('')
  const [violonChincrest, setviolonChincrest] = useState('')

  const [hovered, set] = useState(null)



  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
    document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hovered ? cursor : auto)}'), auto`
  }, [hovered])
  const { nodes, materials } = useGLTF('v.glb')

  return (
    <>
     
      <Picker x={violonBody} y={violonStick} z={violonChincrest} />
      <Canvas gl={{ preserveDrawingBuffer: true }} camera={{ position: [-1.5, 0.5, 3] }}>
        <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 0, 4]} />
        <OrbitControls camera={cameraRef.current} />
        <ambientLight intensity={0.3} />
        <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} />
        <group
          ref={group}
          dispose={null}
          onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
          onPointerOut={(e) => e.intersections.length === 0 && set(null)}
          onPointerMissed={() => (state.current = null)}
          onPointerDown={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}>
          <mesh
            geometry={nodes.subD3_Bout001.geometry}
            material={materials.defaultMat002}
            material-color={snap.items.defaultMat002}
            rotation={[Math.PI / 2, 0, 0]}
            onUpdate={(event) => {
              setviolonBody(snap.items.defaultMat002)
            }}
          />
          <mesh
            geometry={nodes.subD3_Bridge.geometry}
            material={materials.defaultMat003}
            material-color={snap.items.defaultMat003}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            geometry={nodes.subD3_Chincrest.geometry}
            material={materials.defaultMat004}
            material-color={snap.items.defaultMat004}
            rotation={[Math.PI / 2, 0, 0]}
            onUpdate={(event) => {
              setviolonChincrest(snap.items.defaultMat004)
            }}
          />
          <mesh
            geometry={nodes.subD3_End_pin.geometry}
            material={materials.defaultMat005}
            material-color={snap.items.defaultMat005}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            geometry={nodes.subD3_Eyelet.geometry}
            material={materials.defaultMat006}
            material-color={snap.items.defaultMat006}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            geometry={nodes.subD3_Fingerboard.geometry}
            material={materials.defaultMat007}
            material-color={snap.items.defaultMat007}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            geometry={nodes.subD3_Hair.geometry}
            material={materials.defaultMat008}
            material-color={snap.items.defaultMat008}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            geometry={nodes.subD3_Pegs.geometry}
            material={materials.defaultMat009}
            material-color={snap.items.defaultMat009}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            geometry={nodes['subD3_Scroll-and-neck'].geometry}
            material={materials.defaultMat010}
            material-color={snap.items.defaultMat010}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            geometry={nodes.subD3_Stick.geometry}
            material={materials.defaultMat011}
            material-color={snap.items.defaultMat011}
            rotation={[Math.PI / 2, 0, 0]}
            onUpdate={(event) => {
              setviolonStick(snap.items.defaultMat011)
            }}
          />
          <mesh
            geometry={nodes.subD3_Strings.geometry}
            material={materials.defaultMat012}
            material-color={snap.items.defaultMat012}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            geometry={nodes.subD3_Tailpiece.geometry}
            material={materials.defaultMat013}
            material-color={snap.items.defaultMat013}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            geometry={nodes.subD3_Tuners.geometry}
            material={materials.defaultMat014}
            material-color={snap.items.defaultMat014}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            geometry={nodes.subD3_Violin001.geometry}
            material={materials.defaultMat015}
            material-color={snap.items.defaultMat015}
            rotation={[Math.PI / 2, 0, 0]}
          />
        </group>

        <OrbitControls zoomSpeed={0.2} makeDefault dampingFactor={0.2} />
      </Canvas>
    </>
  )
}
/* 

let result = ntc.name('#6195ed');

let rgb_value = result[0];      // #6495ed         : RGB value of closest match
let specific_name = result[1];  // Cornflower Blue : Color name of closest match
let is_exact_match = result[2]; // false           : True if exact color match*/

function Picker({ x, y, z }) {
  const snap = useSnapshot(state)
  const [type, setType] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
      console.log('aaaaaaaaa')
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
  const addCustomizations = () => {
    // new THREE.Color(x).convertSRGBToLinear()
    //var xRGB=hexRgb(x);
    
  

    console.log(resultX)
    if(!(resultX && resultY && resultZ ))
     swal('You must color the missing parts')
     

    const queryParams = new URLSearchParams(window.location.search)
    let resultX = Ntc.name(x.toString())
    let resultY = Ntc.name(y.toString())
    let resultZ = Ntc.name(z.toString())

    // var xRGB= hexRgb(xx);

    Axios.post('http://localhost:5000/customizations', {
      type: type,
      violonBody: resultX[3],
      violonStick: resultY[3],
      violonChincrest: resultZ[3],
      user: queryParams.get('id')
    }).then(() => {
      
    swal("added successfully")
   
    })
    

  }
  return (<>
    
    <div style={{ display: snap.current ? 'block' : 'none', marginLeft: '5%' }}>

      <HexColorPicker className="picker" color={snap.items[snap.current]} onChange={(color) => (state.items[snap.current] = color)} />
      <h1>{snap.current}</h1>
      <div style={{display:"flex"}}>
        <div className="select">
      <select 
        name="type"
        onChange={(event) => {
          setType(event.target.value)
        }}>
        <option value="Guitar">Guitar</option>
        <option value="Violon">Violon</option>
      </select>
      </div>
      <button class="btn-7" onClick={addCustomizations}><span>Save</span></button>
      </div>
    </div>
  </>)
}

/*
function Violon({ ...props }) {
  const group = useRef()
  const snap = useSnapshot(state)
  // Animate model
  const [violonBody, setviolonBody] = useState('')
  const [violonStick, setviolonStick] = useState('')
  const [violonChincrest, setviolonChincrest] = useState('')

  const addCustomizations = () => {
    //{object}

    Axios.post('http://localhost:5000/customizations', {
      violonBody: violonBody,
      violonStick: violonStick,
      violonChincrest: violonChincrest,
      user: JSON.parse(localStorage.getItem('user'))
    }).then(() => {
      console.log('success')
    })
  }

  // Cursor showing current color
  const [hovered, set] = useState(null)

  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
    document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hovered ? cursor : auto)}'), auto`
  }, [hovered])
  const { nodes, materials } = useGLTF('v.glb')
  return (
    <>
      <group
        ref={group}
        dispose={null}
        onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
        onPointerOut={(e) => e.intersections.length === 0 && set(null)}
        onPointerMissed={() => (state.current = null)}
        onPointerDown={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}>
        <mesh
          geometry={nodes.subD3_Bout001.geometry}
          material={materials.defaultMat002}
          material-color={snap.items.defaultMat002}
          rotation={[Math.PI / 2, 0, 0]}
          onChange={(event) => {
            setviolonBody(event.target.value)
          }}
        />
        <mesh
          geometry={nodes.subD3_Bridge.geometry}
          material={materials.defaultMat003}
          material-color={snap.items.defaultMat003}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          geometry={nodes.subD3_Chincrest.geometry}
          material={materials.defaultMat004}
          material-color={snap.items.defaultMat004}
          rotation={[Math.PI / 2, 0, 0]}
          onChange={(event) => {
            setviolonChincrest(event.target.value)
          }}
        />
        <mesh
          geometry={nodes.subD3_End_pin.geometry}
          material={materials.defaultMat005}
          material-color={snap.items.defaultMat005}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          geometry={nodes.subD3_Eyelet.geometry}
          material={materials.defaultMat006}
          material-color={snap.items.defaultMat006}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          geometry={nodes.subD3_Fingerboard.geometry}
          material={materials.defaultMat007}
          material-color={snap.items.defaultMat007}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          geometry={nodes.subD3_Hair.geometry}
          material={materials.defaultMat008}
          material-color={snap.items.defaultMat008}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          geometry={nodes.subD3_Pegs.geometry}
          material={materials.defaultMat009}
          material-color={snap.items.defaultMat009}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          geometry={nodes['subD3_Scroll-and-neck'].geometry}
          material={materials.defaultMat010}
          material-color={snap.items.defaultMat010}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          geometry={nodes.subD3_Stick.geometry}
          material={materials.defaultMat011}
          material-color={snap.items.defaultMat011}
          rotation={[Math.PI / 2, 0, 0]}
          onChange={(event) => {
            setviolonStick(event.target.value)
          }}
        />
        <mesh
          geometry={nodes.subD3_Strings.geometry}
          material={materials.defaultMat012}
          material-color={snap.items.defaultMat012}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          geometry={nodes.subD3_Tailpiece.geometry}
          material={materials.defaultMat013}
          material-color={snap.items.defaultMat013}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          geometry={nodes.subD3_Tuners.geometry}
          material={materials.defaultMat014}
          material-color={snap.items.defaultMat014}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          geometry={nodes.subD3_Violin001.geometry}
          material={materials.defaultMat015}
          material-color={snap.items.defaultMat015}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
    </>
  )
}
*/
