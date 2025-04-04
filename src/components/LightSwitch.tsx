import React from 'react';
import '../styles/lightSwitch.css';

interface LightSwitchProps {
  isDarkMode: boolean;
  isTVOn: boolean;
  toggleLights: () => void;
  toggleTV: () => void;
}

const LightSwitch: React.FC<LightSwitchProps> = ({ 
  isDarkMode, 
  isTVOn,
  toggleLights, 
  toggleTV 
}) => {
  const handleClick = () => {
    if (isDarkMode) {
      // Turning lights on
      toggleLights();
    } else {
      // Turning lights off
      toggleLights();
      if (isTVOn) {
        toggleTV(); // Turn off TV when lights go off
      }
    }
  };

  return (
    <div className="light-switch-container" onClick={handleClick}>
      <div className="light-switch-label">
        <span className="light-off">🌙</span>
        <span className="light-on">☀️</span>
      </div>
      <div className="light-switch">
        <div className={`switch ${isDarkMode ? 'dark' : 'light'}`}></div>
      </div>
    </div>
  );
};

export default LightSwitch;