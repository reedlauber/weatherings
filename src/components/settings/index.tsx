import React, { useCallback, useState } from 'react';

import Theme from './components/theme';
import Toggle from './components/toggle';

import './index.css';

const Settings = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const panelClasses = isOpen ? ' --open' : '';

  return (
    <aside className="settings">
      <div className="settings-toggle">
        <Toggle isOpen={isOpen} onToggle={handleClick} />
      </div>

      <div className={`settings-panel${panelClasses}`}>
        <Theme />
      </div>
    </aside>
  );
});

export default Settings;
