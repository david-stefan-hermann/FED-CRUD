import React, { useContext, useEffect, useRef, useState } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { ShaderMaterial } from 'three'
import * as THREE from 'three'
import { useCamera, useControls } from "../../context/threeContext"


const LoadModel = (props: {model: string, reactive: boolean}) => {
    const model = useLoader(GLTFLoader, process.env.PUBLIC_URL + '/models/' + props.model)
    const [ hover, setHover ] = useState(false)
    const ref = useRef()
    const originalMaterials = useRef<{ [id: number]: THREE.Material }>({})
    const camera = useCamera()
    const controls = useControls()

    // store original materials, so we can reset them on hover out | not currently used
    useEffect(() => {
        if (ref.current && props.reactive) {
            (ref.current as any).traverse((node: { isMesh: any, id: number, material: any }) => {
                if (node.isMesh) {
              // Store the original material
              originalMaterials.current[node.id] = node.material
            }
          })
        }
    }, [])
    
    // set material emissive color on hover
    useEffect(() => {
        try {
            if (ref.current && props.reactive) {
                (ref.current as any).traverse((node: { isMesh: any, id: number, material: any }) => {
                    if (node.isMesh && node.material) {
                        if (hover) {
                            //node.material = shaderMaterial
                            node.material.emissive.setHex(0x0000ff)
                        } else {
                            //node.material = originalMaterials.current[node.id]
                            node.material.emissive.setHex(0x000000)
                        }
                    }
                })
            }
        } catch (e) {
            console.log(e)
        }
    }, [hover])
    

    return (
        <>
        { model ? 
            <mesh
                onPointerEnter={(e) => props.reactive ? setHover(true) : null}
                onPointerLeave={(e) => props.reactive ? setHover(false) : null}
            >
                <primitive ref={ref} object={model.scene} scale={1} position={[0, 0, 0]} />
            </mesh>
        : null }
        </>
    )
}

export default LoadModel
