import React, { useState, useEffect } from 'react';
import TV from './components/TV';
import './styles/tv.css';

const App: React.FC = () => {
    const [dimensions, setDimensions] = useState({
        tvContainer: { width: 0, height: 0 },
        tvScene: { width: 0, height: 0 },
        tv: { width: 0, height: 0 }
    });
    
    // Debug refs to get element dimensions
    const tvContainerRef = React.useRef<HTMLDivElement>(null);
    const tvSceneRef = React.useRef<HTMLDivElement>(null);
    const tvRef = React.useRef<HTMLDivElement>(null);
    
    // Debug state for toggling information
    const [showDebug, setShowDebug] = useState(false);

    // Debug logging wrapper
    const debugLog = (...args: any[]) => {
        if (showDebug) {
            console.log(...args);
        }
    };

    // Update dimensions when components mount
    useEffect(() => {
        debugLog('[App] App component mounted');
        
        const updateDimensions = () => {
            debugLog('[App] Updating dimensions');
            
            const newDimensions = {
                tvContainer: tvContainerRef.current ? {
                    width: tvContainerRef.current.offsetWidth,
                    height: tvContainerRef.current.offsetHeight
                } : { width: 0, height: 0 },
                tvScene: tvSceneRef.current ? {
                    width: tvSceneRef.current.offsetWidth,
                    height: tvSceneRef.current.offsetHeight
                } : { width: 0, height: 0 },
                tv: tvRef.current ? {
                    width: tvRef.current.offsetWidth,
                    height: tvRef.current.offsetHeight
                } : { width: 0, height: 0 }
            };
            
            debugLog('[App] New dimensions:', newDimensions);
            setDimensions(newDimensions);
        };

        updateDimensions();
        const timer = setTimeout(() => {
            debugLog('[App] Delayed dimension update');
            updateDimensions();
        }, 500);
        
        window.addEventListener('resize', updateDimensions);
        return () => {
            window.removeEventListener('resize', updateDimensions);
            clearTimeout(timer);
        };
    }, [showDebug]); // Add showDebug to dependencies

    // Props being passed to components
    const tvProps = {
        size: "xlarge",
        displaySettings: { brightness: 85, contrast: 75 },
        wallColor: "#e6ccac",
        wallTexture: "paint" // Removed 'as const' to make it valid JavaScript
    };
    debugLog('[App] TV props being passed:', tvProps);

    return (
        <div className="tv-container" ref={tvContainerRef}>
            <button 
                onClick={() => setShowDebug(!showDebug)}
                style={{ 
                    position: 'fixed', 
                    top: '10px', 
                    right: '10px', 
                    zIndex: 1000,
                    padding: '8px 12px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: '#fff',
                    border: '1px solid #444',
                    borderRadius: '4px',
                    fontSize: 'clamp(10px, 2vw, 14px)',
                    cursor: 'pointer',
                    maxWidth: '100px',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden'
                }}
            >
                {showDebug ? 'Hide Debug' : 'Show Debug'}
            </button>
            
            {showDebug && (
                <div className="debug-panel" style={{
                    position: 'fixed',
                    top: '50px',
                    right: '10px',
                    background: 'rgba(0,0,0,0.8)',
                    color: 'lime',
                    padding: '10px',
                    borderRadius: '5px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    zIndex: 1000,
                    maxWidth: '300px',
                    maxHeight: '80vh',
                    overflow: 'auto'
                }}>
                    <h3>Debug Information</h3>
                    <h4>Dimensions:</h4>
                    <pre>{JSON.stringify(dimensions, null, 2)}</pre>
                    <h4>TV Props:</h4>
                    <pre>{JSON.stringify(tvProps, null, 2)}</pre>
                </div>
            )}
            
            <div className="tv-scene" ref={tvSceneRef}>
                <div ref={tvRef}>
                    <TV 
                        size={tvProps.size} 
                        displaySettings={tvProps.displaySettings} 
                        showDebug={showDebug}
                        wallColor={tvProps.wallColor}
                        wallTexture={tvProps.wallTexture}
                    />
                </div>
            </div>
        </div>
    );
};

export default App;