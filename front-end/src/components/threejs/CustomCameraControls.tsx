import { extend, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { OrbitControls } from "@react-three/drei/core/OrbitControls"


extend({ OrbitControls })


const CustomCameraControls = () =>{
    const {
        camera,
        gl: { domElement },
    } = useThree()
    const controls = useRef<any>()
    const animationFrameId = useRef<number | null>(null) // Store the ID of the animation frame
    const timeoutId = useRef<NodeJS.Timeout | null>(null) // Store the ID of the timeout


    useEffect(() => {
        const control = controls.current as any
        let start: number | null = null
        control.polarAngle = 1
        const handler = () => {
            if (control) {
                control.polarAngle = Math.PI / 2    // Set the polar angle to the desired value

                // disable auto rotation
                control.autoRotate = false          // Disable auto rotation
                control.autoRotateSpeed = 0         // Set auto rotate speed to 0

                // Cancel the previous animation if it's still running
                if (animationFrameId.current !== null) {
                    cancelAnimationFrame(animationFrameId.current)
                    animationFrameId.current = null
                }

                // Cancel the previous timeout if it's still running
                if (timeoutId.current !== null) {
                    clearTimeout(timeoutId.current)
                }

                // 5 seconds after the camera stops moving, enable auto rotation
                timeoutId.current = setTimeout(() => {
                    control.autoRotate = true       // Enable auto rotation after 5 seconds

                    // Gradually increase autoRotateSpeed to its final value over 2 seconds
                    const duration = 2000 // Duration in milliseconds
                    const finalSpeed = -0.5 // Final auto rotate speed
                    const initialPolarAngle = control.polarAngle // Initial polar angle
                    const finalPolarAngle = Math.PI / 2 // Final polar angle

                    const animate = (timestamp: number) => {
                        if (!start) start = timestamp
                        const progress = Math.min((timestamp - start) / duration, 1)
                        control.autoRotateSpeed = progress * finalSpeed
                        control.polarAngle = initialPolarAngle + progress * (finalPolarAngle - initialPolarAngle)
                        if (progress < 1) {
                            animationFrameId.current = requestAnimationFrame(animate)
                        }
                    }

                    animationFrameId.current = requestAnimationFrame(animate)
                }, 5000)
            }
        }
        if (control) {
            control.addEventListener('end', handler)
        }
        return () => {
            control.removeEventListener('end', handler)
            if (animationFrameId.current !== null) {
                cancelAnimationFrame(animationFrameId.current)
            }
            if (timeoutId.current !== null) {
                clearTimeout(timeoutId.current)
            }
        }
    }, [])

    useFrame(() => (controls as any).current?.update())

    return (
    <>
        <OrbitControls
            ref={controls}
            args={[camera, domElement]}
            enableDamping
            enableRotate
            reverseOrbit
            enablePan={false}
            enableZoom={false}
            dampingFactor={0.06}
            position={[0, 0, 0]}
            target={[0, 1.7, 0]}
            minPolarAngle={Math.PI / 2 -0.1} // limit the vertical rotation (up and down)
            maxPolarAngle={Math.PI / 2 -0.1}
            rotateSpeed={0.2}
            autoRotate // Enable automatic rotation
            autoRotateSpeed={-0.5} // Speed of the automatic rotation
        />
    </>
    )
}

export default CustomCameraControls