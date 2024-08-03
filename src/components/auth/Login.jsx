import { useState, useRef } from "react";
import "./Login.css";
import { SiteNavBar } from "../homepage/siteNavBar.jsx";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const existDialog = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((authInfo) => {
        if (authInfo.valid) {
          localStorage.setItem("Optimum_User", JSON.stringify(authInfo));
          window.location.href = "/office-dashboard"; // Perform a hard reload
        } else {
          existDialog.current.showModal();
        }
      });
  };

  return (
    <>
    <SiteNavBar />
      <main className="container--login">
        <dialog className="dialog dialog--auth" ref={existDialog}>
          <div>User does not exist</div>
          <button
            className="button--close"
            onClick={(e) => existDialog.current.close()}
          >
            Close
          </button>
        </dialog>

        <section>
          <form className="form--login" onSubmit={handleLogin}>
            <h1 className="text-4xl mt-7 mb-3">Optimum Health</h1>
            <h2 className="text-xl mb-10">Please sign in</h2>
            <fieldset className="mb-4">
              <label htmlFor="inputUsername"> Username </label>
              <input
                type="text"
                id="inputUsername"
                value={username}
                onChange={(evt) => setUsername(evt.target.value)}
                className="form-control"
                placeholder="Username"
                required
                autoFocus
              />
            </fieldset>
            <fieldset className="mb-4">
              <label htmlFor="inputPassword"> Password </label>
              <input
                type="password"
                id="inputPassword"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                className="form-control"
                placeholder="Password"
              />
            </fieldset>
            <fieldset>
              <button
                type="submit"
                className="button p-3 rounded-md bg-blue-800 text-blue-100"
              >
                Sign in
              </button>
            </fieldset>
          </form>
        </section>
      </main>
    </>
  );
};
