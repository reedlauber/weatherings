import React, { useCallback, useMemo, useState } from 'react';

import { ThemeMode } from 'types';

import Button from './components/button';

interface SettingsThemeProps {
  onChange?: (theme: ThemeMode) => void;
  theme: ThemeMode;
}

const BUTTONS: {
  hint: string;
  theme: ThemeMode;
  text: string;
}[] = [
  { theme: 'auto', text: 'Auto', hint: 'Light during the day, dark at night' },
  { theme: 'light', text: 'Light', hint: 'Light' },
  { theme: 'dark', text: 'Dark', hint: 'Dark' },
  { theme: 'lcars', text: 'LCARS', hint: 'Make it so' },
];

const SettingsTheme = React.memo<SettingsThemeProps>(({ onChange, theme }) => {
  const [hoveringTheme, setHoveringTheme] = useState<ThemeMode | null>(null);

  const handleClick = useCallback((theme) => {
    onChange?.(theme);
  }, [onChange]);

  const handleMouseOver = useCallback<(theme: ThemeMode) => void>((theme) => {
    setHoveringTheme(theme);
  }, []);

  const handleMouseOut = useCallback(() => {
    setHoveringTheme(null);
  }, []);

  const buttons = useMemo(() => {
    return BUTTONS.map((button) => (
      <Button
        key={button.theme}
        isSelected={theme === button.theme}
        text={button.text}
        theme={button.theme}
        onClick={handleClick}
        onMouseOver={handleMouseOver}
      />
    ));
  }, [handleClick, handleMouseOver, theme]);

  const hint = useMemo(() => {
    if (hoveringTheme) {
      return BUTTONS.find((button) => button.theme === hoveringTheme)?.hint;
    }
  }, [hoveringTheme]);

  return (
    <div className="settings-theme">
      <h2>Theme</h2>

      <div className="-offset settings-theme-field">
        <div className="button-group" onMouseOut={handleMouseOut}>
          {buttons}
        </div>

        {!!hint && (
          <div className="settings-theme-hint">{hint}</div>
        )}
      </div>
    </div>
  );
});

export default SettingsTheme;
