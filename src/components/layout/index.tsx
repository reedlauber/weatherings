import React from 'react';

import './index.css';

const LayoutMain = React.memo(({ children }) => (
  <main className="-offset --huge layout-main">{children}</main>
));

const Layout = React.memo(({ children }) => (
  <div className="layout">{children}</div>
));

export { LayoutMain };

export default Layout;
