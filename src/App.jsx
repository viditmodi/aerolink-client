import { Fragment } from "react";
import "./UI/styles/styles.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard, HomePage, LogOutPage } from "./UI/pages";
import { NavBar } from "./UI/components";

function App() {
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
          path="/logout"
          element={<LogOutPage type={"one"}></LogOutPage>}
        ></Route>
        <Route
          path="/logout/all"
          element={<LogOutPage type={"all"}></LogOutPage>}
        ></Route>

        {/* <Route path="/:id">
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        </Route> */}
        <Route path="/:id/dashboard" element={<Dashboard></Dashboard>}></Route>

        <Route path="*" element={<h1>404</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
