import { useState, useEffect } from 'react';
import './Scale.css';

const Scale = () => {
  const [value, setValue] = useState(0);
  const [result, setResult] = useState('');

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setValue(50); // Move to "Tak tak"
      setTimeout(() => {
        setValue(0); // Move back to the red start after 2 seconds
        setTimeout(() => {
          setResult('Ne dost dobrý'); // Display result in red font after moving back
        }, 1000); // Delay to match the pointer movement
      }, 3000); // Adjust delay to match the pointer movement
    } else if (e.key === 'ArrowRight') {
      setValue(100); // Move to the green end
      setTimeout(() => {
        setResult('Svatý'); // Display result when pointer reaches the green end
      }, 1000); // Delay to match the pointer movement
    }
    setTimeout(() => {
      setValue(0); // Reset pointer position
      setResult(''); // Reset result board
    }, 10000); // Reset after 10 seconds
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const pointerStyle = {
    transform: `rotate(${(value - 50) * 1.8}deg)`,
  };

  return (
    <div className="scale-container">
      <div className="scale">
        <div className="pointer" style={pointerStyle}></div>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
      />
      <div className="label bad" style={{ top: '320px' }}>Špatný</div>
      <div className="label middle" style={{ top: '-60px' }}>Tak tak</div>
      <div className="label good" style={{ top: '320px' }}>Dobrý</div>
      <div className="digital-board" style={{ color: result === 'Ne dost dobrý' ? 'red' : 'green' }}>
        {result}
      </div>
    </div>
  );
};

export default Scale;
