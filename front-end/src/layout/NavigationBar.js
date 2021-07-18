import React, {useState} from "react";
import "./NavigationBar.css";

function NavigationBar() {
  const [toggleButton, setToggleButton] = useState(false);
  const today = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`;
  const toggleButtonHandler = (event) => {
    event.preventDefault();
    toggleButton ? setToggleButton(false) : setToggleButton(true);
  };
  // adding both dropdown and navbar, only one of those will be displayed depending on screen size
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-title">Restaurant Manager</div>
        <button className="toggle-button" onClick={toggleButtonHandler}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <div className={`navbar-links ${toggleButton === true ? "active" : ""}`}>
          <ul>
            <li><a href={`/dashboard?date=${today}`}>Dashboard</a></li>
            <li><a href={`/reservations/new`}>Reservations</a></li>
            <li><a href={`/tables/new`}>Tables</a></li>
            <li><a href={`/search`}>Search</a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavigationBar;