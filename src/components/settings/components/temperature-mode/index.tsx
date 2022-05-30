import React, { useCallback } from 'react';

import { PrimaryUnits } from 'types';

import Button from 'components/button';

interface SettingsTemperatureModeProps {
  onChange?: (mode: PrimaryUnits) => void;
  primaryUnits?: PrimaryUnits;
}

const SettingsTemperatureMode = React.memo<SettingsTemperatureModeProps>(({ onChange, primaryUnits }) => {
  const handleCelciusClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>((event) => {
    onChange?.('celcius');
  }, [onChange]);

  const handleFahrenheitClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>((event) => {
    onChange?.('fahrenheit');
  }, [onChange]);

  return (
    <div className="-offset --xlarge settings-hourly">
      <h2>Primary units</h2>

      <div className="-offset">
        <div className="button-group">
          <Button isSelected={primaryUnits !== 'fahrenheit'} onClick={handleCelciusClick}>C&deg;</Button>
          <Button isSelected={primaryUnits === 'fahrenheit'} onClick={handleFahrenheitClick}>F&deg;</Button>
        </div>
      </div>
    </div>
  );
});

export default SettingsTemperatureMode;
