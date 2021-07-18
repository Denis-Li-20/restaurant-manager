import React from "react";
import Routes from "./Routes";
import NavigationBar from "./NavigationBar";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
/*
function Layout() {
  return (
    <div className="container-fluid">
      <div className="row h-100">
        <div className="col-md-2 side-bar">
          <Menu />
        </div>
        <div className="col">
          <Routes />
        </div>
      </div>
    </div>
  );
}
*/

function Layout() {
  return (
    <div>
      <title>Periodic Tables Restaurant Reservation System</title>
      <div>
        <NavigationBar />
      </div>
      <div>
        <Routes />
      </div>
    </div>
  );
}

export default Layout;
