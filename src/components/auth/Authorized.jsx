import { Navigate, Outlet } from "react-router-dom"
import { OfficeNavBar } from "../officeViews/officeNavBar.jsx"

export const Authorized = () => {
  if (localStorage.getItem("Optimum_User")) {
    return <>
    <OfficeNavBar />
      <main > 
        <Outlet />
      </main>
    </>
  }
  return <Navigate to='/' replace />
}

