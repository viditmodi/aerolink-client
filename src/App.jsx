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

  useEffect(() => {
    ctx.setCurrentId(localStore.getCurrentId() || -1);
  }, [ctx.currentId]);
  return (
    <BrowserRouter>
      {/* <h1>A great project in the making</h1> */}
      <NavBar></NavBar>

      <Routes>
        <Route path="/" element={<HomePage page={"home"}></HomePage>}></Route>
        <Route
          path="/login"
          element={<HomePage page={"login"}></HomePage>}
        ></Route>
        <Route
          path="/register"
          element={<HomePage page={"register"}></HomePage>}
        ></Route>
        <Route
          path="/:id/logout"
          element={<LogOutPage type={"one"}></LogOutPage>}
        ></Route>
        {/* <Route
          path="/:id/logout/all"
          element={<LogOutPage type={"all"}></LogOutPage>}
        ></Route> */}

        <Route path="/:id/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route
          path="/:id/password/change"
          element={<PasswordPage type={"change"}></PasswordPage>}
        ></Route>
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
