import React, { useCallback, useState } from 'react';

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
    <aside className="settings">
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
