import React from 'react';
import '../styles/lightSwitch.css';

interface LightSwitchProps {
  isDarkMode: boolean;
  toggleLights: () => void;
}

const LightSwitch: React.FC<LightSwitchProps> = ({ 
  isDarkMode, 
  toggleLights
}) => {
  return (
    <div className="light-switch-container" onClick={toggleLights}>
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