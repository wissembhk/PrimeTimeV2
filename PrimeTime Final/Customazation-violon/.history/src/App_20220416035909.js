import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, useGLTF, OrbitControls } from '@react-three/drei'
import { proxy, useSnapshot } from 'valtio'
import { HexColorPicker } from 'react-colorful'

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

function Violon({ ...props }) {
  const group = useRef()
  const snap = useSnapshot(state)
  // Animate model

  // Cursor showing current color
  const [hovered, set] = useState(null)
  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
    document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hovered ? cursor : auto)}'), auto`
  }, [hovered])
  const { nodes, materials } = useGLTF('v.glb')
  return (
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
  )
}

function Picker() {
  const snap = useSnapshot(state)
  return (
    <div style={{ display: snap.current ? 'block' : 'none', marginLeft: '5%' }}>
      <HexColorPicker className="picker" color={snap.items[snap.current]} onChange={(color) => (state.items[snap.current] = color)} />
      <h1>{snap.current}</h1>
    </div>
  )
}

export default function App() {
  return (
    <>
      <Picker />
      <Canvas concurrent pixelRatio={[1, 1.5]} camera={{ position: [0, 0, 2.75] }}>
        <ambientLight intensity={0.3} />
        <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} />

        <Violon />

        <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} height={10} blur={2} far={1} />

        <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} />
      </Canvas>
    </>
  )
}
