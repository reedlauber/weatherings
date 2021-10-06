import React, { useCallback } from 'react';

import { MoonIcon, SunIcon } from 'components/icons';

import useTheme from './useTheme';

const ThemeButton = React.memo(() => {
  const [mode, onToggle] = useTheme();

  const handleClick = useCallback(() => {
    onToggle();
  }, [onToggle]);

  return (
    <div className="theme-button">
      <button className="theme-button-button" onClick={handleClick} title="Light/dark mode" type="button">
        {mode === 'light' && <SunIcon />}
        {mode === 'dark' && <MoonIcon />}
      </button>
    </div>
  );
});

export default ThemeButton;
