import React, { useCallback } from 'react';

import './index.css';

interface SwitchProps {
  isChecked?: boolean;
  onChange?: (isChecked: boolean) => void;
}

const Switch = React.memo<SwitchProps>(({ isChecked = false, onChange }) => {
  const handleChange = useCallback((event) => {
    onChange?.(event.target.checked);
  }, [onChange]);

  return (
    <div className="switch">
      <input type="checkbox" checked={isChecked} onChange={handleChange} />
      <span />
    </div>
  );
});

export default Switch;
