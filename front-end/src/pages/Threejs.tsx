import React, { Suspense, useEffect, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import LoadingSpinner from "../components/LoadingSpinner"
import { Mesh } from "three"


const Threejs = () => {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ availableHeight, setAvailableHeight ] = useState(0)
    const isMountedRef = useRef(true)
    

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
                    <p>a</p>
                    {
                    <Canvas
                        className="w-full h-screen bg-transparent"
                        camera={{near: 0.1, far: 1000}}
                    >
                        <Suspense fallback={<LoadingSpinner />}>

                        <ambientLight intensity={0.1} />
                        <directionalLight color="red" position={[0, 0, 5]} />
                        <mesh>
                            <boxGeometry />
                            <meshStandardMaterial />
                        </mesh>

                        </Suspense>
                    </Canvas>
                    }
                </div>
            }
        </>
    )
}

export default Threejs