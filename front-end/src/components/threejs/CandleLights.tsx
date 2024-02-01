import React, { useEffect, useRef, useState } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Mesh, ShaderMaterial } from 'three'
import * as THREE from 'three'


const CandleLights = (props: {model: string}) => {
    const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + '/models/' + props.model)
    const [vertices, setVertices] = useState<THREE.Vector3[]>([])

    useEffect(() => {
        if (gltf) {
            const verts: THREE.Vector3[] = []
            gltf.scene.traverse((child) => {
                if (child instanceof Mesh) {
                    child.updateMatrixWorld(true)
                    const positionAttribute = child.geometry.attributes.position
                    for (let i = 0; i < positionAttribute.count; i++) {
                        const vertex = new THREE.Vector3(
                            positionAttribute.getX(i),
                            positionAttribute.getY(i),
                            positionAttribute.getZ(i)
                        )
                        vertex.applyMatrix4(child.matrixWorld)
                        verts.push(vertex)
                    }
                }
            })
            setVertices(verts)
        }
    }, [gltf])

    const lightRefs = Array(vertices.length).fill(null).map(() => ({ current: null }))

    let frameCount = 0

    useFrame(() => {
        frameCount++

        if (frameCount % 10 === 0) { // Update intensity every 10 frames
            lightRefs.forEach(lightRef => {
                if (lightRef.current) {
                    const flicker = Math.random() * 1.2; // Reduce this value to make the flickering slower
                    (lightRef.current as THREE.PointLight).intensity = 3 + flicker
                }
            })
        }
    })


    return (
        <>
        {vertices.map((vertex, index) => (
            <group position={vertex} key={index}>
                <pointLight ref={lightRefs[index]} color={0xffa500} distance={20} intensity={2} />
            </group>
        ))}
        </>
    )
}

export default CandleLights
