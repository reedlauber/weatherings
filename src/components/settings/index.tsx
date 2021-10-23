import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Settings, ThemeMode } from 'types';

import Hourly from './components/hourly';
import Theme from './components/theme';
import Toggle from './components/toggle';

import './index.css';

interface SettingsProps {
  settings: Settings;
  onSaveSettings?: (updates: Partial<Settings>) => void;
}

const SettingsPanel = React.memo<SettingsProps>(({ settings, onSaveSettings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isOpenRef = useRef(false);

  // Hide the Settings panel when something else is clicked
  const handleBodyClick = useCallback((event) => {
    if (isOpenRef.current) {
      setIsOpen(false);
    }
  }, []);

  const handleSettingsClick = useCallback((event) => {
    event.stopPropagation();
  }, []);

  useEffect(() => {
    document.body.addEventListener('click', handleBodyClick);

    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, [handleBodyClick]);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  // Button click handlers
  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleThemeChange = useCallback((theme: ThemeMode) => {
    onSaveSettings?.({ theme });
  }, [onSaveSettings]);

  const handleHourlyChange = useCallback((showHourly) => {
    onSaveSettings?.({ showHourly });
  }, [onSaveSettings]);

  const panelClasses = isOpen ? ' --open' : '';

  return (
    <aside className="settings" onClick={handleSettingsClick}>
      <div className="settings-toggle">
        <Toggle isOpen={isOpen} onToggle={handleClick} />
      </div>

      <div className={`settings-panel${panelClasses}`}>
        <Theme onChange={handleThemeChange} theme={settings.theme} />
        <Hourly onChange={handleHourlyChange} showHourly={settings.showHourly} />
      </div>
    </aside>
  );
});

export default SettingsPanel;
