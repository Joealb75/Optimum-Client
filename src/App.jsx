import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { Authorized } from "./components/auth/Authorized.jsx";
import { Login } from "./components/auth/Login.jsx";
//import { InternalViews } from "./components/InternalViews.jsx";
import { HomePage } from "./components/homepage/home.jsx";
import { Register } from "./components/auth/Register.jsx";
import { AdminDashboard } from "./components/officeViews/adminDashboard.jsx";

export const App = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem("Optimum_User"));
    if (userFromStorage && userFromStorage.id) {
      setCurrentUser({ id: userFromStorage.id }); // Ensure currentUser is always an object with an id property
    }
  }, []);
  //console.log(currentUser)

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage currentUser={currentUser} />} />
        <Route path="/office-login" element={<Login />} />
        <Route path="/articles" />
        <Route path="/contact" />

        <Route element={<Authorized currentUser={currentUser}/>}>
          <Route path="/register" element={<Register />} />
          <Route path="/admin-dashboard" element={<AdminDashboard currentUser={currentUser}/>} />
        </Route>

      </Routes>
    </>
  );
};
