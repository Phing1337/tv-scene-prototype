import React, { useEffect } from 'react';
import '../styles/tv.css';
import YouTube from 'react-youtube';

interface TVProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  displaySettings?: {
    brightness: number;
    contrast: number;
  };
  showDebug?: boolean;
  wallColor?: string; 
  wallTexture?: 'wood' | 'paint' | 'wallpaper';
  isOn?: boolean;
}

const TV: React.FC<TVProps> = ({ 
  size = 'medium', 
  displaySettings = { brightness: 80, contrast: 70 },
  showDebug = false,
  wallColor = '#e8d0b3',
  wallTexture = 'paint',
  isOn = false
}) => {
  // Get actual rendered dimensions
  const tvRef = React.useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  const youtubePlayerRef = React.useRef<any>(null);
  
  // Debug logging wrapper
  const debugLog = (...args: any[]) => {
    if (showDebug) {
      console.log(...args);
    }
  };
  
  // Wall texture patterns
  const getWallTextureStyle = () => {
    switch(wallTexture) {
      case 'wood':
        return {
          backgroundImage: `
            linear-gradient(90deg, 
            ${wallColor} 0px, 
            ${wallColor} 20px, 
            ${adjustColor(wallColor, -10)} 20px, 
            ${adjustColor(wallColor, -10)} 22px, 
            ${wallColor} 22px, 
            ${wallColor} 42px)
          `,
          backgroundSize: '42px 100%'
        };
      case 'wallpaper':
        return {
          backgroundImage: `
            radial-gradient(circle at 50% 50%, 
            ${adjustColor(wallColor, 5)} 0%, 
            ${adjustColor(wallColor, 5)} 0.5px, 
            ${wallColor} 0.5px, 
            ${wallColor} 15px)
          `,
          backgroundSize: '20px 20px'
        };
      case 'paint':
      default:
        return {
          background: `linear-gradient(170deg, 
            ${wallColor} 0%, 
            ${adjustColor(wallColor, -15)} 100%)
          `,
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.1)'
        };
    }
  };
  
  // Helper function to adjust color brightness
  const adjustColor = (color: string, amount: number): string => {
    // Convert hex to RGB
    const hexToRgb = (hex: string): number[] => {
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      const hex2 = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex2);
      return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
      ] : [0, 0, 0];
    };
    
    // Convert RGB to hex
    const rgbToHex = (r: number, g: number, b: number): string => {
      return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };
    
    // Adjust color
    const rgb = hexToRgb(color);
    const newRgb = rgb.map(c => {
      const newC = c + amount;
      return Math.min(255, Math.max(0, newC));
    });
    
    return rgbToHex(newRgb[0], newRgb[1], newRgb[2]);
  };
  
  debugLog('[TV] Component rendering with props:', { size, displaySettings, showDebug, wallColor, wallTexture, isOn });
  
  React.useEffect(() => {
    debugLog('[TV] useEffect running, size prop:', size);
    
    if (tvRef.current) {
      const initialWidth = tvRef.current.offsetWidth;
      const initialHeight = tvRef.current.offsetHeight;
      
      debugLog('[TV] Initial dimensions:', { width: initialWidth, height: initialHeight });
      debugLog('[TV] Applied CSS classes:', tvRef.current.className);
      
      if (showDebug) {
        const computedStyle = window.getComputedStyle(tvRef.current);
        debugLog('[TV] Computed styles:', { 
          width: computedStyle.width,
          height: computedStyle.height,
          display: computedStyle.display,
          position: computedStyle.position
        });
      }
      
      setDimensions({
        width: initialWidth,
        height: initialHeight
      });
    }
    
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        debugLog('[TV] ResizeObserver detected size change:', { 
          width: newWidth, 
          height: newHeight 
        });
        setDimensions({
          width: newWidth,
          height: newHeight
        });
      }
    });
    
    if (tvRef.current) {
      resizeObserver.observe(tvRef.current);
    }
    
    return () => {
      if (tvRef.current) {
        resizeObserver.unobserve(tvRef.current);
      }
    };
  }, [size, showDebug]);

  // Handle YouTube player ready event
  const onPlayerReady = (event: any) => {
    youtubePlayerRef.current = event.target;
    // Ensure video is playing and looping
    event.target.playVideo();
    debugLog('[TV] YouTube player ready');
  };

  // Handle YouTube player state changes
  const onPlayerStateChange = (event: any) => {
    // If video ends (state 0), restart it to ensure looping works
    if (event.data === 0) {
      event.target.playVideo();
      debugLog('[TV] YouTube video restarted for looping');
    }
  };

  // CSS classes based on props
  const tvClasses = `tv tv-${size}`;
  
  // Custom styles based on display settings
  const screenStyle = {
    filter: `brightness(${displaySettings.brightness}%) contrast(${displaySettings.contrast}%)`,
    opacity: isOn ? 1 : 0,
    transition: 'opacity 0.3s ease'
  };

  // YouTube player options - enhanced for better looping and fullscreen appearance
  const videoOptions = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 0,
      loop: 1,
      playlist: 'IvuefbvVmcI',
      start: 30,
      enablejsapi: 1,
      modestbranding: 1,
      iv_load_policy: 3,
      rel: 0,
      showinfo: 0,
      fs: 0,
      disablekb: 1,
      origin: window.location.origin,
    }
  };

  return (
    <div className="tv-debug-wrapper">      
      <div className={`tv ${tvClasses} ${isOn ? 'on' : 'off'}`} ref={tvRef} data-size={size}>
        <div className="tv-frame">
          <div className="tv-screen" style={screenStyle}>
            <div className="tv-content">
              {/* YouTube video embedded here with enhanced config */}
              <div className="youtube-container">
                <YouTube 
                  videoId="IvuefbvVmcI" 
                  opts={videoOptions} 
                  onReady={onPlayerReady}
                  onStateChange={onPlayerStateChange}
                  className="youtube-player"
                />
              </div>

              {showDebug && (
                <div className="tv-debug-content">
                  <p style={{ color: 'white', textAlign: 'center' }}>TV Component</p>
                  <p style={{ color: 'white', textAlign: 'center' }}>Size: {size}</p>
                </div>
              )}
            </div>
          </div>
          <div className="tv-controls">
            {/* Empty controls section */}
          </div>
        </div>
      </div>

      {/* Debug overlay - only show when showDebug is true */}
      {showDebug && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          border: '2px dotted lime',
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
          pointerEvents: 'none',
          zIndex: 10
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            background: 'rgba(0, 128, 0, 0.7)',
            color: 'white',
            fontSize: '10px',
            padding: '2px 5px',
          }}>
            TV: {size} ({dimensions.width}x{dimensions.height})
            <br />
            Wall: {wallColor} ({wallTexture})
          </div>
        </div>
      )}
    </div>
  );
};

export default TV;