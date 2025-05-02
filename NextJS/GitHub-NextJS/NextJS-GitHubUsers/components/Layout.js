import React from "react";

function Layout({ children }) {
  return (
    <div className="content">
      <div className="mainContent">{children}</div>
    </div>
  );
}

export default Layout;
