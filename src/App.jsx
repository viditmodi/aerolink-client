import { Fragment, useContext, useEffect } from "react";
import "./UI/styles/styles.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Dashboard,
  HomePage,
  LogOutPage,
  PasswordPage,
  SwitchPage,
} from "./UI/pages";
import { NavBar } from "./UI/components";
import IdContext from "./context/IdContext/IdContext";
import localStore from "./config/localstorage.config";

function App() {
  const ctx = useContext(IdContext);

  // Reads the Current ID from the SessionStorage of the tab and resets the value of the context variable
  useEffect(() => {
    ctx.setCurrentId(localStore.getCurrentId());
  }, [ctx.currentId]);
  return (
    <BrowserRouter>
      <NavBar></NavBar>

      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HomePage page={"home"}></HomePage>}></Route>
        {/* Home Page - Login View */}
        <Route
          path="/login"
          element={<HomePage page={"login"}></HomePage>}
        ></Route>
        {/* Home Page - Register View */}
        <Route
          path="/register"
          element={<HomePage page={"register"}></HomePage>}
        ></Route>
        {/* Logout Page (ID Specific) */}
        <Route
          path="/:id/logout"
          element={<LogOutPage type={"one"}></LogOutPage>}
        ></Route>
        {/* Dropped: <Route
          path="/:id/logout/all"
          element={<LogOutPage type={"all"}></LogOutPage>}
        ></Route> */}

        {/* Dashboard Page (ID Specific) */}
        <Route path="/:id/dashboard" element={<Dashboard></Dashboard>}></Route>
        {/* Password Page - Change View (ID Specific) */}
        <Route
          path="/:id/password/change"
          element={<PasswordPage type={"change"}></PasswordPage>}
        ></Route>
        {/* Password Page - Reset View (ID Specific) */}
        <Route
          path="/password/reset"
          element={<PasswordPage type={"reset"}></PasswordPage>}
        ></Route>
        <Route path="/switch" element={<SwitchPage></SwitchPage>}></Route>

        <Route path="*" element={<h1>404</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
