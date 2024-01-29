import React, { Suspense, useEffect, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import LoadingSpinner from "../components/LoadingSpinner"


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
                    {/*
                    <Canvas
                        className="w-full h-screen bg-transparent"
                        camera={{near: 0.1, far: 1000}}
                    >
                        <Suspense fallback={<LoadingSpinner />}>
                            
                        </Suspense>
                    </Canvas>*/
                    }
                </div>
            }
        </>
    )
}

export default Threejs