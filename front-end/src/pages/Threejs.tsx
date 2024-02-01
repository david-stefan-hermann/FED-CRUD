import React, { Suspense, useEffect, useState } from "react"
import { Canvas, useLoader } from "@react-three/fiber"
import LoadingSpinner from "../components/LoadingSpinner"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Environment } from "@react-three/drei/core/Environment"
import LoadModel from "../components/threejs/LoadModel"
import CustomCameraControls from "../components/threejs/CustomCameraControls"
import CandleLights from "../components/threejs/CandleLights"


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
                                
                console.log("height: " + availableHeight)
                
                setIsLoading(false)
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
                        {false ? <Environment preset="sunset" background /> : null}
                        <Suspense fallback={<></>}>
                        
                        <ambientLight intensity={0.4} />
                        
                        <CustomCameraControls>
                            <LoadModel model="LowPolyDungeon.glb" reactive={false} />
                            <LoadModel model="LowPolyDungeonBook.glb" reactive={true} />
                            <LoadModel model="LowPolyDungeonBookshelf.glb" reactive={true} />
                            <LoadModel model="LowPolyDungeonBarrels.glb" reactive={true} />
                            <LoadModel model="LowPolyDungeonChest.glb" reactive={true} />
                            <LoadModel model="LowPolyDungeonFireplace.glb" reactive={true} />
                            <LoadModel model="LowPolyDungeonScale.glb" reactive={true} />
                            <LoadModel model="LowPolyDungeonShield.glb" reactive={true} />
                            <CandleLights model="LowPolyDungeonLights.glb" />
                        </CustomCameraControls>
                        
                        </Suspense>
                    </Canvas>
                    }
                </div>
            }
        </>
    )
}

export default Threejs