import React, { HTMLAttributes } from 'react';

import './index.css';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isSelected?: boolean;
}

const Button = React.memo<ButtonProps>(({ children, isSelected = false, ...rest }) => {
  const classes = `button${isSelected ? ' --selected' : ''}`;

  return (
    <button className={classes} type="button" {...rest}>{children}</button>
  );
});

export default Button;
