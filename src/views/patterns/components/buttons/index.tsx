import React from 'react';

const Buttons = React.memo(() => {
  return (
    <div className="patterns-buttons">
      <div>
        <button className="button">Button</button>
      </div>

      <div className="-offset">
        <div className="button-group">
          <button className="button">Button</button>
          <button className="button">group</button>
        </div>
      </div>
    </div>
  );
});

export default Buttons;
