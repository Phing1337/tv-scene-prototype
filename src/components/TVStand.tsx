import React from 'react';
import '../styles/tv.css';

interface TVStandProps {
  height?: 'short' | 'medium' | 'large';
  style?: React.CSSProperties;
  showDebug?: boolean; // Add showDebug prop
}

const TVStand: React.FC<TVStandProps> = ({ 
  height = 'medium', 
  style = {},
  showDebug = true // Default to showing debug
}) => {
  // Ref for measuring rendered dimensions
  const standRef = React.useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  
  React.useEffect(() => {
    if (standRef.current) {
      setDimensions({
        width: standRef.current.offsetWidth,
        height: standRef.current.offsetHeight
      });
    }
    
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });
    
    if (standRef.current) {
      resizeObserver.observe(standRef.current);
    }
    
    return () => {
      if (standRef.current) {
        resizeObserver.unobserve(standRef.current);
      }
    };
  }, []);

  // CSS classes based on props
  const standClasses = `tv-stand tv-stand-${height}`;
  
  return (
    <div className="tvstand-debug-wrapper" style={{ position: 'relative' }}>
      <div className={standClasses} ref={standRef} style={style}>
        <div className="tv-stand-top"></div>
        <div className="tv-stand-middle"></div>
        <div className="tv-stand-base">
          {/* Debug text visible in component only when debug is enabled */}
          {showDebug && (
            <div className="stand-debug-content" style={{ fontSize: '10px', textAlign: 'center', color: '#ccc' }}>
              TVStand: {height}
            </div>
          )}
        </div>
      </div>
      
      {/* Debug overlay - only show when showDebug is true */}
      {showDebug && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          border: '2px dotted blue',
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
            background: 'rgba(0, 0, 255, 0.7)',
            color: 'white',
            fontSize: '10px',
            padding: '2px 5px',
          }}>
            Stand: {height} ({dimensions.width}x{dimensions.height})
          </div>
        </div>
      )}
    </div>
  );
};

export default TVStand;