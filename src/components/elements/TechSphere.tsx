"use client"

import { useEffect, useRef, useState } from "react"
import { Float, Text, useTexture } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface LogoType {
  name: string
  path: string
}

const logos: LogoType[] = [
  { name: "NextJS", path: "/images/assets/stack-logos/nextjs-icon.svg" },
  {
    name: "JavaScript",
    path: "/images/assets/stack-logos/javascript-icon.svg",
  },
  { name: "NodeJS", path: "/images/assets/stack-logos/nodejs-icon.svg" },
  { name: "ReactJS", path: "/images/assets/stack-logos/reactjs-icon.svg" },
  { name: "ExpressJS", path: "/images/assets/stack-logos/expressjs-icon.svg" },
  { name: "MongoDB", path: "/images/assets/stack-logos/mongodb-icon.svg" },
  { name: "MariaDB", path: "/images/assets/stack-logos/mariadb-icon.svg" },
  {
    name: "TailwindCSS",
    path: "/images/assets/stack-logos/tailwindcss-icon.svg",
  },
  {
    name: "Google Cloud",
    path: "/images/assets/stack-logos/googlecloud-icon.svg",
  },
  { name: "Git", path: "/images/assets/stack-logos/git-icon.svg" },
  {
    name: "Cloudflare",
    path: "/images/assets/stack-logos/cloudflare-icon.svg",
  },
  { name: "AWS", path: "/images/assets/stack-logos/aws-icon.svg" },
]

interface TechLogoProps {
  position: [number, number, number]
  logo: LogoType
  index: number
}

const TechLogo = ({ position, logo, index }: TechLogoProps) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const texture = useTexture(logo.path) as THREE.Texture

  // Generate a position on a sphere
  const radius = 2.5
  const phi = Math.acos(-1 + (2 * index) / logos.length)
  const theta = Math.sqrt(logos.length * Math.PI) * phi

  // Calculate position on sphere surface
  const x = radius * Math.cos(theta) * Math.sin(phi)
  const y = radius * Math.sin(theta) * Math.sin(phi)
  const z = radius * Math.cos(phi)

  useFrame((state) => {
    if (!meshRef.current) return

    // Rotate around the center
    const time = state.clock.getElapsedTime() * 0.15
    const orbitRadius = 2.5

    // Calculate orbit position with different speeds for each logo
    meshRef.current.position.x = orbitRadius * Math.cos(time + index)
    meshRef.current.position.z = orbitRadius * Math.sin(time + index)
    meshRef.current.position.y = Math.sin(time * 0.5 + index) * 0.5

    // Always face the camera
    meshRef.current.lookAt(state.camera.position)
  })

  return (
    <mesh
      ref={meshRef}
      position={[x, y, z]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[0.8, 0.8]} />
      <meshBasicMaterial
        map={texture}
        transparent={true}
        opacity={hovered ? 1 : 0.8}
      />
      {hovered && (
        <Text
          position={[0, -0.6, 0]}
          fontSize={0.2}
          color="#90cdf4"
          anchorX="center"
          anchorY="middle"
        >
          {logo.name}
        </Text>
      )}
    </mesh>
  )
}

const CoreSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.y = time * 0.1
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial
        color="#1e40af"
        emissive="#3b82f6"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
        <CoreSphere />
      </Float>
      {logos.map((logo, index) => (
        <TechLogo
          key={logo.name}
          logo={logo}
          index={index}
          position={[0, 0, 0]}
        />
      ))}
    </>
  )
}

const TechSphere = () => {
  const [mounted, setMounted] = useState(false)

  // Only render the canvas on the client side
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="aspect-square w-full overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900">
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  )
}

export default TechSphere
