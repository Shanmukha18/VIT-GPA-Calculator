import React, { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import './App.css';
import GpaCalculator from './components/GpaCalcluator';
import CgpaCalculator from './components/CgpaCalculator';

function App() {
  const [theme, setTheme] = useState('light');
  const [calcMode, setCalcMode] = useState('GPA');

  const [resetTrigger, setResetTrigger] = useState(false);

  const handleReset = () => {
    setResetTrigger(prev => !prev); 
    setCalcMode('GPA');
  };;

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`app-wrapper ${theme}`}>
      <div className="main-content">
        <div className="top-bar">
          <button className="reset-button" onClick={handleReset}>Reset</button>

          <div className="mode-controls">
            <button
              className={`mode-button ${calcMode === 'GPA' ? 'active' : ''}`}
              onClick={() => setCalcMode('GPA')}
            >
              GPA Calculator
            </button>
            <button
              className={`mode-button ${calcMode === 'CGPA' ? 'active' : ''}`}
              onClick={() => setCalcMode('CGPA')}
            >
              CGPA Calculator
            </button>
          </div>

          <button className="theme-switch" onClick={toggleTheme}>
            {theme === 'light' ? <FaMoon className="icon" /> : <FaSun className="icon" />}
            <div className={`slider ${theme === 'light' ? 'light' : 'dark'}`}></div>
          </button>
        </div>

        <div className="calculator-container">
          <div className={`calculator-view ${calcMode === 'GPA' ? 'visible' : 'hidden'}`}>
            <GpaCalculator resetTrigger={resetTrigger} />
          </div>
          <div className={`calculator-view ${calcMode === 'CGPA' ? 'visible' : 'hidden'}`}>
            <CgpaCalculator resetTrigger={resetTrigger} />
          </div>
        </div>

        <footer className="footer">
          <div className="footer-content">
            <p>&copy; {new Date().getFullYear()} Shanmukha Thadavarthi. All rights reserved.</p>
            <div className="footer-links">
              <a href="https://github.com/Shanmukha18" target="_blank" rel="noopener noreferrer">GitHub</a>
              <span>•</span>
              <a href="mailto:shanmukha.thadavarthi@gmail.com">shanmukha.thadavarthi@gmail.com</a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default App;
