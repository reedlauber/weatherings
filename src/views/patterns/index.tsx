import React from 'react';

import Buttons from './components/buttons';
import Colors from './components/colors';
import Typography from './components/typography';

import './index.css';

const Patterns = React.memo(() => {
  return (
    <div className="patterns">
      <h1>Patterns</h1>

      <div className="patterns-section">
        <h2>Colors</h2>
        <Colors />
      </div>

      <div className="patterns-section">
        <h2>Typography</h2>
        <Typography />
      </div>

      <div className="patterns-section">
        <h2>Buttons</h2>
        <Buttons />
      </div>

      <div className="patterns-section">
        <h2>Switches</h2>
      </div>

      <div className="patterns-section">
        <h2>Offsets</h2>
      </div>

      <div className="patterns-section">
        <h2>Components</h2>
      </div>
    </div>
  );
});

export default Patterns;
