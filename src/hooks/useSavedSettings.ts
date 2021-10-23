import { useCallback, useEffect, useRef, useState } from 'react';

import { getSettings as getStoredSettings, setSettings as setStoredSettings } from 'lib/local';
import type { Settings } from 'types';

type UseSavedSettingsResult = [Settings, (updates: Partial<Settings>) => void];

const useSavedSettings = (): UseSavedSettingsResult => {
  const ref = useRef<Settings>({ showHourly: false, theme: 'light' });
  const [settings, setSettings] = useState<Settings>(ref.current);

  useEffect(() => {
    ref.current = getStoredSettings(); 
    setSettings(ref.current);
  }, []);

  const handleChange = useCallback((updates: Partial<Settings>) => {
    const updatedSettings: Settings = {
      ...ref.current,
      ...updates,
    };

    ref.current = updatedSettings;
    setSettings(updatedSettings);
    setStoredSettings(updatedSettings);
  }, []);

  return [settings, handleChange];
};

export default useSavedSettings;
