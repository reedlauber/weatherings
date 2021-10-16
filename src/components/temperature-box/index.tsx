import React from 'react';

import './index.css';

const TemperatureBox = React.memo(({ children }) => (
  <div className="temp-box">{children}</div>
));

export default TemperatureBox;
