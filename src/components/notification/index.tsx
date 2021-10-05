import React from 'react';

interface NotificationProps {
  message: string;
  type?: 'default' | 'error' | 'warning';
}

const Notification = React.memo<NotificationProps>(({ message, type }) => {
  const classes = ['notification', '-offset'];

  if (type === 'error') {
    classes.push('--error');
  }

  if (type === 'warning') {
    classes.push('--warning');
  }

  return <div className={classes.join(' ')}>{message}</div>;
});

export default Notification;
