import { Fragment, useContext, useEffect } from "react";
import "./UI/styles/styles.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Dashboard,
  HomePage,
  LogOutPage,
  PasswordPage,
  RegisterPage,
  SwitchPage,
  LoginPage,
} from "./UI/pages";
import { Loader, NavBar } from "./UI/components";
import IdContext from "./context/IdContext/IdContext";
import localStore from "./config/localstorage.config";
import storage from "./helpers/storage.helper";

// function App() {
//   const ctx = useContext(IdContext);

//   // Reads the Current ID from the SessionStorage of the tab and resets the value of the context variable
//   useEffect(() => {
//     ctx.setCurrentId(storage.getSessionIndex());
//   }, [ctx.currentId]);
//   return (
//     <BrowserRouter>
//       <NavBar></NavBar>

//       <Routes>
//
//         {/* Logout Page (ID Specific) */}
//
//         {/* Dropped: <Route
//           path="/:id/logout/all"
//           element={<LogOutPage type={"all"}></LogOutPage>}
//         ></Route> */}

//         {/* Dashboard Page (ID Specific) */}
//
//         {/* Password Page - Change View (ID Specific) */}
//
//         {/* Password Page - Reset View (ID Specific) */}
//
//
//       </Routes>
//     </BrowserRouter>
//   );
// }

const App = () => {
  const ctx = useContext(IdContext);
  useEffect(() => {}, [ctx.isLoading, ctx.numberOfAccounts]);
  if (ctx.isLoading) {
    return <Loader></Loader>;
  } else {
    return (
      <BrowserRouter>
        <NavBar></NavBar>
        {/* {ctx.isLoading && } */}
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>

          <Route
            path="/register"
            element={<RegisterPage></RegisterPage>}
          ></Route>

          <Route path="/login" element={<LoginPage></LoginPage>}></Route>

          <Route path="/switch" element={<SwitchPage></SwitchPage>}></Route>

          {/* ID Specific Routes */}

          {/* Dashboard Routes */}
          <Route
            path="/:id/dashboard/profile/update"
            element={<Dashboard view={"update-profile"}></Dashboard>}
          ></Route>
          <Route
            path="/:id/dashboard/profile"
            element={<Dashboard view={"view-profile"}></Dashboard>}
          ></Route>
          <Route
            path="/:id/dashboard/password/change"
            element={<PasswordPage type={"change"}></PasswordPage>}
          ></Route>
          <Route
            path="/:id/dashboard"
            element={<Dashboard view={"view-profile"}></Dashboard>}
          ></Route>

          <Route
            path="/:id/logout"
            element={<LogOutPage type={"one"}></LogOutPage>}
          ></Route>

          {/* <Route
            path="/:id/password/change"
            element={}
          ></Route> */}

          <Route
            path="/password/reset"
            element={<PasswordPage type={"reset"}></PasswordPage>}
          ></Route>

          {/* 404 Not Found */}
          <Route path="*" element={<h1>404</h1>}></Route>
        </Routes>
      </BrowserRouter>
    );
  }
};
export default App;
