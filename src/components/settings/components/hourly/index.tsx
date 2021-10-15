import React from 'react';

import Switch from 'components/switch';

interface SettingsHourlyProps {
  onChange?: (showHourly: boolean) => void;
  showHourly: boolean;
}

const SettingsHourly = React.memo<SettingsHourlyProps>(({ onChange, showHourly }) => {
  return (
    <div className="-offset --xlarge settings-hourly">
      <h2>Show hourly temps</h2>

      <div className="-offset">
        <Switch isChecked={showHourly} onChange={onChange} />
      </div>
    </div>
  );
});

export default SettingsHourly;
