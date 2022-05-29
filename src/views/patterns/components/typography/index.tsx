import React from 'react';

const Typography = React.memo(() => {
  return (
    <div className="patterns-typography">
      <p>
        <span className="patterns-typopgrahy-default">Default text</span>
      </p>

      <p>
        <span className="patterns-typopgrahy-title">Title text</span>
      </p>
    </div>
  );
});

export default Typography;
