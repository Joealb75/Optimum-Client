import { Route, Routes } from "react-router-dom";
import { Authorized } from "./components/auth/Authorized.jsx";
import { Login } from "./components/auth/Login.jsx";
import { HomePage } from "./components/homepage/home.jsx";
import { Register } from "./components/auth/Register.jsx";
import { OfficeDashboard } from "./components/officeViews/officeDashboard.jsx";
import { useCurrentUser } from "./TSQ_hooks/useCurrentUser.js";
import { ConsultationDetail } from "./components/consulataion/ConsultationDetail.jsx";
export const App = () => {

  const { currentUser} = useCurrentUser();

  return (
    <div className="w-full min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage currentUser={currentUser} />} />
        <Route path="/office-login" element={<Login />} />
        <Route path="/articles" />
        <Route path="/contact" />

        <Route element={<Authorized currentUser={currentUser}/>}>
          <Route path="/register" element={<Register />} />
          <Route path="/office-dashboard" element={<OfficeDashboard currentUser={currentUser}/>} />
          <Route path="/consultation/:id" element={< ConsultationDetail />} />
        </Route>
      </Routes>
    </div>
  );
};


// :userId - pull a PARAMETER 
// {currentUser} - pass a PROP