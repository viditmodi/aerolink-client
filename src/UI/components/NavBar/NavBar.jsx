import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import localStore from "../../../config/localstorage.config";

const NavBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { id } = useParams();
  const numLoggedInAccounts = localStore.doesAccountExist();
  const showMenu = () => {
    const navBarContainer = document.getElementById("navBarContainer");
    navBarContainer.style.width = "100vmin";
    // navBarContainer.style.height = "100svh";
    console.log("open");
    setIsVisible(true);
  };
  const hideMenu = () => {
    const navBarContainer = document.getElementById("navBarContainer");
    navBarContainer.style.width = "clamp(3rem, 10%, 6rem)";
    console.log("close");
    setIsVisible(false);
  };
  return (
    <div className="navbar__container" id="navBarContainer">
      <nav className="navbar__nav">
        <ul className="navbar__list">
          <li className="navbar__list__item" onClick={hideMenu}>
            <Link to={"/"} className="navbar__list__link">
              Home {id}
            </Link>
          </li>
          <li className="navbar__list__item" onClick={hideMenu}>
            <Link to={"/login"} className="navbar__list__link">
              {numLoggedInAccounts === 0 ? "Login" : "Add Account"}
            </Link>
          </li>
          <li className="navbar__list__item" onClick={hideMenu}>
            <Link to={"/register"} className="navbar__list__link">
              {numLoggedInAccounts === 0 ? "Register" : "Create New Account"}
            </Link>
          </li>
          {numLoggedInAccounts > 0 && (
            <li className="navbar__list__item" onClick={hideMenu}>
              <a href="/switch" target="_blank" className="navbar__list__link">
                Switch Account
              </a>
            </li>
          )}
          {numLoggedInAccounts > 0 && (
            <li className="navbar__list__item" onClick={hideMenu}>
              <Link to={"/logout"} className="navbar__list__link">
                Logout
              </Link>
            </li>
          )}
          {numLoggedInAccounts > 0 && (
            <li className="navbar__list__item" onClick={hideMenu}>
              <Link to={"/logout/all"} className="navbar__list__link">
                Logout from All Devices
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <button onClick={isVisible ? hideMenu : showMenu} className="navbar__btn">
        M
      </button>
    </div>
  );
};

export default NavBar;
