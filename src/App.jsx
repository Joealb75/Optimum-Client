import './App.css'
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { Authorized } from "./components/auth/Authorized.jsx";
import { Login } from "./components/auth/Login.jsx";
import { InternalViews } from './components/InternalViews.jsx';
import { HomePage } from './components/homepage/home.jsx';

export const App = () => {
  
  const [currentUser, setCurrentUser] = useState({})
  
  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem("Optimum_User"));
    if (userFromStorage && userFromStorage.id) {
      setCurrentUser({ id: userFromStorage.id }); // Ensure currentUser is always an object with an id property
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage currentUser={currentUser}/>} />

        <Route path="/login" element={<Login />} />
        <Route path="/articles" />
        <Route path='/contact' />
        
        

        <Route
          path="*"
          element={
            // check if the user is authorized first
            <Authorized>
              {/*  if they are authorized the application views is the child component of Authorized and will render in only if "Optimum_User"
           is present in local storage  */}
              <InternalViews currentUser={currentUser}/>
            </Authorized>
          }
        />
      </Routes>
    </>
  )
}


