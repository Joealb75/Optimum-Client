import { Route, Routes, Outlet } from "react-router-dom";
import { Register } from "/src/components/auth/Register.jsx";


export const InternalViews = ({currentUser}) => {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <>
            <Outlet />
          </>
        }>
          <Route index element={<BShomePage currentUser={currentUser}/>} />
          <Route path={`/profile/${currentUser.id}`} element={<WriterProfile currentUser={currentUser}/>} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};

// :userId - pull a PARAMETER 
// {currentUser} - pass a PROP