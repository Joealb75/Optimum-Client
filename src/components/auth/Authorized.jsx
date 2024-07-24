import { Navigate, Outlet } from "react-router-dom"

export const Authorized = () => {
  if (localStorage.getItem("Optimum_User")) {
    return <>
      {/* <NavBar /> */}
      <main className="p-4">
        <Outlet />
      </main>
    </>
  }
  return <Navigate to='/' replace />
}