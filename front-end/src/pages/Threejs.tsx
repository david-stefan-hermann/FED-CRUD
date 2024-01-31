import React, { Suspense, useEffect, useState } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import LoadingSpinner from "../components/LoadingSpinner"
import { OrbitControls } from "@react-three/drei/core/OrbitControls"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Environment } from "@react-three/drei/core/Environment"


const Threejs = () => {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ availableHeight, setAvailableHeight ] = useState(0)

    const gltf_dungeon = useLoader(GLTFLoader, process.env.PUBLIC_URL + '/models/LowPolyDungeon.glb')

    useEffect(() => {
        const updateHeight = () => {
            console.log("update height")
            
            // Create refs
            const headerElem = document.querySelector('header')
            const footerElem = document.querySelector('footer')
            
            if (headerElem && footerElem) {
                setAvailableHeight(window.innerHeight - headerElem.clientHeight - footerElem.clientHeight)
                
                setIsLoading(false)
                
                console.log("height: " + availableHeight)
            }
        }
        updateHeight()
    }, [])


    return (
        <>
            {isLoading ? <LoadingSpinner></LoadingSpinner> :
                <div style={{height: availableHeight}}>
                    {
                    <Canvas
                        className="w-full h-screen bg-transparent"
                        camera={{ fov: 55, position: [0, 0, 0], near: 0.1, far: 1000 }}
                    >
                        <Environment preset="sunset" background />
                        <Suspense fallback={<LoadingSpinner />}>
                        
                        <ambientLight intensity={0.1} />
                        <directionalLight color="green" position={[0, 0, 5]} />

                        <primitive object={gltf_dungeon.scene} scale={1} position={[0, 0, 0]} />
                        
                        {false ? <><mesh position={[3, 0, 0]}><boxGeometry /><meshStandardMaterial /></mesh>
                        <mesh position={[-3, 0, 0]}><boxGeometry /><meshStandardMaterial /></mesh>
                        <mesh position={[0, 0, -3]}><boxGeometry /><meshStandardMaterial /></mesh>
                        <mesh position={[0, 0, 3]}><boxGeometry /><meshStandardMaterial /></mesh></> : <></>}


                        <OrbitControls
                            onPointerDown={() => console.log("IsDragging(true)")}
                            onPointerUp={() => console.log("setIsDragging(false)")}
                            enableDamping
                            enableRotate
                            reverseOrbit
                            enablePan={false}
                            enableZoom={false}
                            dampingFactor={0.1}
                            position={[0, 0, 0]}
                            target={[0, 1.5, 0]}
                            minPolarAngle={Math.PI / 2 - 0.4} // limit the vertical rotation (up and down)
                            maxPolarAngle={Math.PI / 2 + 0.4}
                        />
                        </Suspense>
                    </Canvas>
                    }
                </div>
            }
        </>
    )
}

export default Threejs