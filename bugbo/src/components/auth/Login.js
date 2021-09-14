import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../utils/auth";
import "./Auth.css";

export const Login = () => {
  const email = useRef();
  const password = useRef();
  const invalidDialog = useRef();
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    login(email.current.value, password.current.value).then((success) => {
      if (success) {
        history.push("/");
      } else {
        window.alert("Email or password was not valid.");
      }
    });
  };

  return (
    <main className="container--login">
      <section>
        <form className="form--login" onSubmit={handleLogin}>
          <h1>Bugbo</h1>
          <h2>Please sign in</h2>
          <fieldset>
            <label htmlFor="inputEmail"> Email address </label>
            <input
              ref={email}
              type="email"
              id="email"
              className="form-control"
              defaultValue="me@me.com"
              placeholder="Email address"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <label htmlFor="inputPassword"> Password </label>
            <input
              ref={password}
              type="password"
              id="password"
              className="form-control"
              defaultValue="me"
              placeholder="Password"
              required
            />
          </fieldset>
          <fieldset
            style={{
              textAlign: "center",
            }}
          >
            <button className="btn btn-1 btn-sep icon-send" type="submit">
              Sign In
            </button>
          </fieldset>
        </form>
      </section>
      <section className="link--register">
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  );
};
