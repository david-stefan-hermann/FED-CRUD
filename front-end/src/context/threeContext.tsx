import React, { createContext, useContext } from 'react';

// Create a context for the camera
const CameraContext = createContext<any | null>(null);

// Create a hook to use the camera context
export const useCamera = () => useContext(CameraContext);

// Create a context for the controls
const ControlsContext = createContext<any | null>(null);

// Create a hook to use the controls context
export const useControls = () => useContext(ControlsContext);

// Create a provider component for the camera context
export const CameraAndControlsProvider: React.FC<{ camera: any; controls: any; children: React.ReactNode }> = ({ camera, controls, children }) => {
    return (
        <CameraContext.Provider value={camera}>
            <ControlsContext.Provider value={controls}>
                {children}
            </ControlsContext.Provider>
        </CameraContext.Provider>
  );
};