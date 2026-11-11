import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef, type RefObject } from 'react'
import * as THREE from 'three'

type MotionTheme = 'morning' | 'afternoon' | 'night'
type PointerCoordinates = { x: number; y: number }
type AmbientSceneProps = {
  theme: MotionTheme
  reducedMotion: boolean
  pointerRef: RefObject<PointerCoordinates>
}

const themeColors = {
  morning: { primary: '#2563eb', secondary: '#0ea5e9', glow: '#f3a83c' },
  afternoon: { primary: '#d95d39', secondary: '#e38b4d', glow: '#ffd36e' },
  night: { primary: '#3b82f6', secondary: '#06b6d4', glow: '#93c5fd' },
} as const

/** Creates a repeatable point field for theme particles and network nodes. */
function createParticleGeometry() {
  const positions = new Float32Array(360)
  for (let index = 0; index < positions.length; index += 3) {
    const seed = index / 3
    positions[index] = Math.sin(seed * 12.9898) * 5.2
    positions[index + 1] = Math.cos(seed * 4.1414) * 3.1
    positions[index + 2] = -1 - (seed % 16) * 0.16
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  return geometry
}

/** Builds connection lines between nearby points for the night network. */
function createConnectionGeometry(geometry: THREE.BufferGeometry) {
  const positions = geometry.getAttribute('position').array as Float32Array
  const connections: number[] = []
  for (let index = 0; index < positions.length / 3; index += 1) {
    const neighbor = index + 7
    if (neighbor >= positions.length / 3) continue
    const first = index * 3
    const second = neighbor * 3
    const distance = Math.hypot(positions[first] - positions[second], positions[first + 1] - positions[second + 1])
    if (distance < 2.1) {
      connections.push(positions[first], positions[first + 1], positions[first + 2])
      connections.push(positions[second], positions[second + 1], positions[second + 2])
    }
  }
  const lines = new THREE.BufferGeometry()
  lines.setAttribute('position', new THREE.Float32BufferAttribute(connections, 3))
  return lines
}

/** Draws a theme-specific procedural scene that reacts to pointer movement. */
function SceneContents({ theme, reducedMotion, pointerRef }: AmbientSceneProps) {
  const palette = themeColors[theme]
  const particleGeometry = useMemo(createParticleGeometry, [])
  const connectionGeometry = useMemo(() => createConnectionGeometry(particleGeometry), [particleGeometry])
  const fieldRef = useRef<THREE.Points>(null)
  const sunRef = useRef<THREE.Group>(null)
  const bridgeRef = useRef<THREE.Group>(null)
  const packetRefs = [useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null)]
  const cableGeometry = useMemo(() => {
    const cable = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-4.5, -1.05, -2.2),
      new THREE.Vector3(-2.2, 1.45, -2.2),
      new THREE.Vector3(0, 0.28, -2.2),
      new THREE.Vector3(2.2, 1.45, -2.2),
      new THREE.Vector3(4.5, -1.05, -2.2),
    ])
    return new THREE.TubeGeometry(cable, 96, 0.018, 6, false)
  }, [])

  useFrame((state, delta) => {
    if (reducedMotion) return
    const elapsed = state.clock.elapsedTime
    const pointer = pointerRef.current
    state.camera.position.x += (pointer.x * 0.24 - state.camera.position.x) * delta * 1.6
    state.camera.position.y += (pointer.y * 0.16 - state.camera.position.y) * delta * 1.6
    state.camera.lookAt(0, 0, -0.8)
    if (fieldRef.current) {
      fieldRef.current.rotation.y = Math.sin(elapsed * 0.12) * 0.08 + pointer.x * 0.035
      fieldRef.current.rotation.x = Math.cos(elapsed * 0.1) * 0.035 + pointer.y * 0.025
    }
    if (sunRef.current) sunRef.current.rotation.z = Math.sin(elapsed * 0.08) * 0.04
    if (bridgeRef.current) bridgeRef.current.rotation.y = pointer.x * 0.045 + Math.sin(elapsed * 0.16) * 0.025
    packetRefs.forEach((packetRef, index) => {
      if (!packetRef.current) return
      const progress = (elapsed * 0.12 + index * 0.5) % 1
      packetRef.current.position.x = -4.3 + progress * 8.6
      packetRef.current.position.y = -1.04 + Math.sin(progress * Math.PI) * 0.07
    })
    const positions = particleGeometry.getAttribute('position') as THREE.BufferAttribute
    const values = positions.array as Float32Array
    for (let index = 1; index < values.length; index += 3) {
      values[index] += Math.sin(elapsed * 0.22 + index) * 0.0007
    }
    positions.needsUpdate = true
  })

  return (
    <>
      <ambientLight intensity={0.9} />
      <group ref={fieldRef}>
        <points geometry={particleGeometry}>
          <pointsMaterial color={palette.secondary} size={0.035} transparent opacity={theme === 'night' ? 0.8 : 0.48} sizeAttenuation depthWrite={false} />
        </points>
        {theme === 'night' && <lineSegments geometry={connectionGeometry}>
          <lineBasicMaterial color={palette.primary} transparent opacity={0.22} depthWrite={false} />
        </lineSegments>}
      </group>
      {theme === 'morning' && <group ref={sunRef} position={[2.8, 1.1, -2.8]}>
        <mesh>
          <sphereGeometry args={[0.78, 40, 40]} />
          <meshBasicMaterial color={palette.glow} transparent opacity={0.84} />
        </mesh>
        <mesh scale={1.42}>
          <sphereGeometry args={[0.78, 32, 32]} />
          <meshBasicMaterial color={palette.glow} transparent opacity={0.1} depthWrite={false} />
        </mesh>
        <mesh rotation={[0, 0, 0.1]}>
          <torusGeometry args={[1.18, 0.008, 6, 96]} />
          <meshBasicMaterial color={palette.secondary} transparent opacity={0.42} />
        </mesh>
        <mesh position={[-0.8, -0.3, 0]}>
          <sphereGeometry args={[0.48, 20, 20]} />
          <meshBasicMaterial color={palette.secondary} transparent opacity={0.17} />
        </mesh>
        <mesh position={[-0.42, -0.22, 0]}>
          <sphereGeometry args={[0.32, 20, 20]} />
          <meshBasicMaterial color={palette.secondary} transparent opacity={0.17} />
        </mesh>
      </group>}
      {theme === 'afternoon' && <group ref={bridgeRef}>
        <mesh position={[0, -1.12, -2.2]}>
          <boxGeometry args={[9.2, 0.08, 0.22]} />
          <meshBasicMaterial color={palette.primary} transparent opacity={0.52} />
        </mesh>
        {[-2.2, 2.2].map((position) => <mesh key={position} position={[position, 0.12, -2.2]}>
          <boxGeometry args={[0.085, 2.5, 0.1]} />
          <meshBasicMaterial color={palette.secondary} transparent opacity={0.66} />
        </mesh>)}
        <mesh geometry={cableGeometry}>
          <meshBasicMaterial color={palette.glow} transparent opacity={0.68} />
        </mesh>
        <mesh geometry={cableGeometry} scale={[1, 1, 1.035]}>
          <meshBasicMaterial color={palette.primary} transparent opacity={0.22} depthWrite={false} />
        </mesh>
        {Array.from({ length: 19 }, (_, index) => {
          const x = -1.9 + index * 0.21
          const height = 0.18 + (1 - Math.abs(x) / 2.2) * 1.45
          return <mesh key={x} position={[x, -1.08 + height / 2, -2.2]}>
            <boxGeometry args={[0.012, height, 0.025]} />
            <meshBasicMaterial color={palette.glow} transparent opacity={0.34} />
          </mesh>
        })}
        {packetRefs.map((packetRef, index) => <mesh key={index} ref={packetRef} position={[-4.3, -1.04, -2]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color={palette.glow} />
        </mesh>)}
        <mesh position={[-4.8, -0.72, -2.4]}>
          <boxGeometry args={[0.45, 0.7, 0.4]} />
          <meshBasicMaterial color={palette.primary} transparent opacity={0.13} />
        </mesh>
        <mesh position={[4.8, -0.55, -2.4]}>
          <boxGeometry args={[0.55, 1.05, 0.4]} />
          <meshBasicMaterial color={palette.secondary} transparent opacity={0.12} />
        </mesh>
      </group>}
      {theme === 'night' && <group position={[1.5, 0, -1.8]}>
        <mesh>
          <icosahedronGeometry args={[0.62, 1]} />
          <meshBasicMaterial color={palette.primary} wireframe transparent opacity={0.3} />
        </mesh>
        <mesh rotation={[0.35, 0.4, 0.2]}>
          <torusGeometry args={[1.05, 0.009, 5, 96]} />
          <meshBasicMaterial color={palette.secondary} transparent opacity={0.56} />
        </mesh>
        <mesh rotation={[-0.3, 0.2, -0.4]}>
          <torusGeometry args={[1.4, 0.006, 5, 96]} />
          <meshBasicMaterial color={palette.primary} transparent opacity={0.32} />
        </mesh>
      </group>}
    </>
  )
}

/** Renders a non-intercepting full-screen canvas behind portfolio content. */
export default function AmbientScene(props: AmbientSceneProps) {
  return (
    <div aria-hidden="true" className={`ambient-scene ambient-scene-${props.theme}`}>
      <Canvas camera={{ position: [0, 0, 10], fov: 38 }} dpr={[1, 1.4]} frameloop={props.reducedMotion ? 'demand' : 'always'} gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}>
        <SceneContents {...props} />
      </Canvas>
    </div>
  )
}
