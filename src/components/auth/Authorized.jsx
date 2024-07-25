import { Navigate, Outlet } from "react-router-dom"

export const Authorized = () => {
  if (localStorage.getItem("Optimum_User")) {
    return <>
      <main > 
        <Outlet />
      </main>
    </>
  }
  return <Navigate to='/' replace />
}

