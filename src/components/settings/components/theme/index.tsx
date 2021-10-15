import React, { useCallback, useEffect } from 'react';

import { ThemeMode } from 'types';

import Button from 'components/button';

import useTheme from './hooks/useTheme';

interface SettingsThemeProps {
  onChange?: (theme: ThemeMode) => void;
  theme: ThemeMode;
}

const SettingsTheme = React.memo<SettingsThemeProps>(({ onChange, theme }) => {
  const [_, setMode] = useTheme();

  useEffect(() => {
    setMode(theme);
  }, [theme, setMode]);

  const handleLightClick = useCallback(() => {
    onChange?.('light');
  }, [onChange]);

  const handleDarkClick = useCallback(() => {
    onChange?.('dark');
  }, [onChange]);

  return (
    <div className="settings-theme">
      <h2>Theme</h2>

      <div className="-offset">
        <div className="button-group">
          <Button isSelected={theme === 'light'} onClick={handleLightClick}>Light</Button>
          <Button isSelected={theme === 'dark'} onClick={handleDarkClick}>Dark</Button>
        </div>
      </div>
    </div>
  );
});

export default SettingsTheme;
