import React, { Suspense, useEffect, useRef, useState } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import LoadingSpinner from "../components/LoadingSpinner"
import { OrbitControls } from "@react-three/drei/core/OrbitControls"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Environment } from "@react-three/drei/core/Environment"
import LoadModel from "../components/threejs/LoadModel"
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import CustomCameraControls from "../components/threejs/CustomCameraControls"


const Threejs = () => {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ availableHeight, setAvailableHeight ] = useState(0)

    const gltf_dungeon = useLoader(GLTFLoader, process.env.PUBLIC_URL + '/models/LowPolyDungeon.glb')
    const gltf_book = useLoader(GLTFLoader, process.env.PUBLIC_URL + '/models/LowPolyDungeonBook.glb')

    // set canvas to height
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
                        <Suspense fallback={<></>}>
                        
                        <ambientLight intensity={0.1} />
                        <directionalLight color="green" position={[0, 0, 5]} />
                        
                        <LoadModel model="LowPolyDungeon.glb" reactive={false} />
                        <LoadModel model="LowPolyDungeonBook.glb" reactive={true} />
                        <LoadModel model="LowPolyDungeonBookshelf.glb" reactive={true} />
                        <LoadModel model="LowPolyDungeonBarrels.glb" reactive={true} />
                        <LoadModel model="LowPolyDungeonChest.glb" reactive={true} />
                        <LoadModel model="LowPolyDungeonFireplace.glb" reactive={true} />
                        <LoadModel model="LowPolyDungeonScale.glb" reactive={true} />
                        <LoadModel model="LowPolyDungeonShield.glb" reactive={true} />
                        


                        {false ? <><mesh position={[3, 0, 0]}><boxGeometry /><meshStandardMaterial /></mesh>
                        <primitive object={gltf_dungeon.scene} scale={1} position={[0, 0, 0]} />
                        <mesh position={[-3, 0, 0]}><boxGeometry /><meshStandardMaterial /></mesh>
                        <mesh position={[0, 0, -3]}><boxGeometry /><meshStandardMaterial /></mesh>
                        <mesh position={[0, 0, 3]}><boxGeometry /><meshStandardMaterial /></mesh></> : <></>}

                        <CustomCameraControls />
                        
                        </Suspense>
                    </Canvas>
                    }
                </div>
            }
        </>
    )
}

export default Threejs