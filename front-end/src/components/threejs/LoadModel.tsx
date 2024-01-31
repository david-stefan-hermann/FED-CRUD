import React, { useEffect, useRef, useState } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { MeshStandardMaterial, ShaderMaterial } from "three"

const LoadModel = (props: {model: string, reactive: boolean}) => {
    const model = useLoader(GLTFLoader, process.env.PUBLIC_URL + '/models/' + props.model)
    const [ hover, setHover ] = useState(false)
    const ref = useRef()
    const originalMaterials = useRef<{ [id: number]: THREE.Material }>({})

    const shaderMaterial = new ShaderMaterial({
        vertexShader: `
          void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          void main() {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // red color
          }
        `,
      })
      
    
    useEffect(() => {
        console.log(props.model + " hover: " + hover)
    }, [hover])


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
    

    useEffect(() => {
        if (ref.current && props.reactive) {
            (ref.current as any).traverse((node: { isMesh: any, id: number, material: any }) => {
                if (node.isMesh) {
                    if (hover) {
                        node.material = shaderMaterial
                    } else {
                        node.material = originalMaterials.current[node.id]
                    }
                }
            })
        }
    }, [hover])


    return (
        <mesh
            onPointerEnter={(e) => props.reactive ? setHover(true) : null}
            onPointerLeave={(e) => props.reactive ? setHover(false) : null}
        >
            <primitive ref={ref} object={model.scene} scale={1} position={[0, 0, 0]} />
        </mesh>
    )
}

export default LoadModel
