import React, { useCallback } from 'react';

import Button from 'components/button';

import useTheme from './hooks/useTheme';

const SettingsTheme = React.memo(() => {
  const [mode, setMode] = useTheme();

  const handleLightClick = useCallback(() => {
    setMode('light');
  }, [setMode]);

  const handleDarkClick = useCallback(() => {
    console.log('click dark')
    setMode('dark');
  }, [setMode]);

  return (
    <div className="settings-theme">
      <h2>Theme</h2>

      <div className="-offset">
        <div className="button-group">
          <Button isSelected={mode === 'light'} onClick={handleLightClick}>Light</Button>
          <Button isSelected={mode === 'dark'} onClick={handleDarkClick}>Dark</Button>
        </div>
      </div>
    </div>
  );
});

export default SettingsTheme;
