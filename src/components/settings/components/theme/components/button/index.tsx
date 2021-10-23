import React, { useCallback } from 'react';

import type { ThemeMode } from 'types';

import Button from 'components/button';

interface ThemeButtonProps {
  isSelected?: boolean;
  onClick?: (theme: ThemeMode) => void;
  onMouseOver?: (theme: ThemeMode) => void;
  text: string;
  theme: ThemeMode;
}

const ThemeButton = React.memo<ThemeButtonProps>(({ isSelected, onClick, onMouseOver, text, theme }) => {
  const handleClick = useCallback(() => {
    onClick?.(theme);
  }, [onClick, theme]);

  const handleMouseOver = useCallback(() => {
    onMouseOver?.(theme);
  }, [onMouseOver, theme]);

  return (
    <Button
      isSelected={isSelected}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
    >{text}</Button>
  );
});

export default ThemeButton;
