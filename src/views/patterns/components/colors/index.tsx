import React from 'react';
import classnames from 'classnames';

const COLORS = [
  {
    name: 'Grey',
    colors: [
      { id: 'grey-100', label: 'Grey 100' },
      { id: 'grey-200', label: 'Grey 200' },
      { id: 'grey-300', label: 'Grey 300' },
      { id: 'grey-400', label: 'Grey 400' },
      { id: 'grey-500', label: 'Grey 500' },
      { id: 'grey-600', label: 'Grey 600' },
      { id: 'grey-700', label: 'Grey 700' },
      { id: 'grey-800', label: 'Grey 800' },
      { id: 'grey-900', label: 'Grey 900' },
    ],
  },
  {
    name: 'Red',
    colors: [
      { id: 'red-100', label: 'Red 100' },
      { id: 'red-200', label: 'Red 200' },
      { id: 'red-300', label: 'Red 300' },
      { id: 'red-400', label: 'Red 400' },
      { id: 'red-500', label: 'Red 500' },
      { id: 'red-600', label: 'Red 600' },
      { id: 'red-700', label: 'Red 700' },
      { id: 'red-800', label: 'Red 800' },
      { id: 'red-900', label: 'Red 900' },
    ]
  },
  {
    name: 'Yellow',
    colors: [
      { id: 'yellow-100', label: 'Yellow 100' },
      { id: 'yellow-200', label: 'Yellow 200' },
      { id: 'yellow-300', label: 'Yellow 300' },
      { id: 'yellow-400', label: 'Yellow 400' },
      { id: 'yellow-500', label: 'Yellow 500' },
      { id: 'yellow-600', label: 'Yellow 600' },
      { id: 'yellow-700', label: 'Yellow 700' },
      { id: 'yellow-800', label: 'Yellow 800' },
      { id: 'yellow-900', label: 'Yellow 900' },
    ]
  },
  {
    name: 'Misc',
    colors: [
      { id: 'border', label: 'Border' },
      { id: 'default', label: 'Text' },
      { id: 'background', label: 'Background' },
      { id: 'title', label: 'Title' },
      { id: 'icon', label: 'Icons' },
    ]
  }
];

const Colors = React.memo(() => {
  const groups = COLORS.map((group) => {
    const colorItems = group.colors.map((color) => {
      const styles = {
        '--h': `var(--color-${color.id}-h)`,
        '--s': `var(--color-${color.id}-s)`,
        '--l': `var(--color-${color.id}-l)`,
        '--color': `var(--color-${color.id})`,
      };
      const classes = classnames('patterns-color', {
        '--computed': group.name === 'Misc',
        '--text': color.id === 'default' || color.id === 'title',
      });
      return (
        <li key={color.id} className={classes} style={styles}>{color.label}</li>
      );
    });
    return (<ul key={group.name} className="patterns-colors-list">{colorItems}</ul>);
  });

  return (
    <div className="patterns-colors">
      {groups}
    </div>
  );
});

export default Colors;
