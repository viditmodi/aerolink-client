import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import localStore from "../../../config/localstorage.config";
import IdContext from "../../../context/IdContext/IdContext";
import storage from "../../../helpers/storage.helper";

const NavBar = () => {
  const ctx = useContext(IdContext);

  const [menuState, setMenuState] = useState("close");

  const [isVisible, setIsVisible] = useState(false);
  const numberOfAccounts = storage.getNumberOfAccounts();
  useEffect(() => {}, [ctx.currentId]);
  const showMenu = () => {
    setMenuState("open");
    setIsVisible(true);
  };
  const hideMenu = () => {
    setMenuState("close");
    setIsVisible(false);
  };

  return (
    <>
      <nav className={`navbar__nav navbar__nav--${menuState}`}>
        <ul className="navbar__list">
          {/* home */}
          <li className="navbar__list__item" onClick={hideMenu}>
            <Link to={"/"} className="navbar__list__link">
              Home
              {/* {ctx.currentId} */}
            </Link>
          </li>
          {/* login */}
          <li className="navbar__list__item" onClick={hideMenu}>
            <Link to={"/login"} className="navbar__list__link">
              {numberOfAccounts === 0 ? "Login" : "Add Account"}
            </Link>
          </li>
          {/* register */}
          <li className="navbar__list__item" onClick={hideMenu}>
            <Link to={"/register"} className="navbar__list__link">
              {numberOfAccounts === 0 ? "Register" : "Create Another Account"}
            </Link>
          </li>
          {/* Switch */}
          {numberOfAccounts > 0 && (
            <li className="navbar__list__item" onClick={hideMenu}>
              <a href="/switch" target="_blank" className="navbar__list__link">
                Switch Account
              </a>
            </li>
          )}
          {ctx.currentId >= 0 && (
            <li className="navbar__list__item" onClick={hideMenu}>
              <Link
                to={`/${ctx.currentId}/dashboard`}
                className="navbar__list__link"
              >
                Dashboard
              </Link>
            </li>
          )}
          {/* {ctx.currentId >= 0 && (
            <li className="navbar__list__item" onClick={hideMenu}>
              <Link
                to={`/${ctx.currentId}/password/change`}
                className="navbar__list__link"
              >
                Change Password
              </Link>
            </li>
          )} */}
          {ctx.currentId >= 0 && (
            <li className="navbar__list__item" onClick={hideMenu}>
              <Link
                to={`/${ctx.currentId}/logout`}
                className="navbar__list__link"
              >
                Logout
              </Link>
            </li>
          )}
          {/* {ctx.currentId >= 0 && (
            <li className="navbar__list__item" onClick={hideMenu}>
              <Link
                to={`/${ctx.currentId}/logout/all`}
                className="navbar__list__link"
              >
                Logout from All Devices
              </Link>
            </li>
          )} */}
        </ul>
      </nav>
      <button
        onClick={isVisible ? hideMenu : showMenu}
        className="navbar__btn btn "
      >
        <span class="material-symbols-outlined">widgets</span>
        {/* {isVisible && <span class="material-symbols-outlined">close</span>} */}
        {/* {!isVisible && <span class="material-symbols-outlined">widgets</span>} */}
      </button>
    </>
  );
  // return (
  //   <div
  //     className={`navbar__container navbar__container--${menuState}`}
  //     id="navBarContainer"
  //   >
  //     <nav className="navbar__nav">
  //       <ul className="navbar__list">
  //         {/* home */}
  //         <li className="navbar__list__item" onClick={hideMenu}>
  //           <Link to={"/"} className="navbar__list__link">
  //             Home
  //             {/* {ctx.currentId} */}
  //           </Link>
  //         </li>
  //         {/* login */}
  //         <li className="navbar__list__item" onClick={hideMenu}>
  //           <Link to={"/login"} className="navbar__list__link">
  //             {numLoggedInAccounts === 0 ? "Login" : "Add Account"}
  //           </Link>
  //         </li>
  //         {/* register */}
  //         <li className="navbar__list__item" onClick={hideMenu}>
  //           <Link to={"/register"} className="navbar__list__link">
  //             {numLoggedInAccounts === 0 ? "Register" : "Create New Account"}
  //           </Link>
  //         </li>
  //         {/* Switch */}
  //         {numLoggedInAccounts > 0 && (
  //           <li className="navbar__list__item" onClick={hideMenu}>
  //             <a href="/switch" target="_blank" className="navbar__list__link">
  //               Switch Account
  //             </a>
  //           </li>
  //         )}
  //         {ctx.currentId >= 0 && (
  //           <li className="navbar__list__item" onClick={hideMenu}>
  //             <Link
  //               to={`/${ctx.currentId}/dashboard`}
  //               className="navbar__list__link"
  //             >
  //               Dashboard
  //             </Link>
  //           </li>
  //         )}
  //         {ctx.currentId >= 0 && (
  //           <li className="navbar__list__item" onClick={hideMenu}>
  //             <Link
  //               to={`/${ctx.currentId}/password/change`}
  //               className="navbar__list__link"
  //             >
  //               Change Password
  //             </Link>
  //           </li>
  //         )}
  //         {ctx.currentId >= 0 && (
  //           <li className="navbar__list__item" onClick={hideMenu}>
  //             <Link
  //               to={`/${ctx.currentId}/logout`}
  //               className="navbar__list__link"
  //             >
  //               Logout
  //             </Link>
  //           </li>
  //         )}
  //         {/* {ctx.currentId >= 0 && (
  //           <li className="navbar__list__item" onClick={hideMenu}>
  //             <Link
  //               to={`/${ctx.currentId}/logout/all`}
  //               className="navbar__list__link"
  //             >
  //               Logout from All Devices
  //             </Link>
  //           </li>
  //         )} */}
  //       </ul>
  //     </nav>
  //     <button
  //       onClick={isVisible ? hideMenu : showMenu}
  //       className="navbar__btn btn "
  //     >
  //       M
  //     </button>
  //   </div>
  // );
};

export default NavBar;
