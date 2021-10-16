import React from 'react';

import { SunIcon } from 'components/icons';

interface SettingsToggleProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

const SettingsToggle = React.memo<SettingsToggleProps>(({ isOpen = false, onToggle }) => {

  return (
    <div className="settings-toggle">
      <button className="settings-toggle-button" onClick={onToggle} title="Toggle settings sidebar" type="button">
        <SunIcon />
      </button>
    </div>
  );
});

export default SettingsToggle;
