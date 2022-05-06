import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

export const LogInForm = () => {
  const { store, actions } = useContext(Context);
  const [logIn, setLogIn] = useState({
    email: "",
    password: "",
  });

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={(e) => setLogIn({ ...logIn, email: e.target.value })}
          value={logIn.email}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          onChange={(e) => setLogIn({ ...logIn, password: e.target.value })}
          value={logIn.password}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={(e) => {
          e.preventDefault();
          actions.logIn(logIn);
        }}
      >
        Submit
      </button>
    </form>
  );
};

export const SignUpForm = () => {
  const { store, actions } = useContext(Context);
  const [signUp, setSignUp] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  return (
    <form className="needs-validation">
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={(e) => setSignUp({ ...signUp, email: e.target.value })}
          value={signUp.email}
          required
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          onChange={(e) => setSignUp({ ...signUp, password: e.target.value })}
          value={signUp.password}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          onChange={(e) =>
            setSignUp({ ...signUp, confirmPassword: e.target.value })
          }
          value={signUp.confirmPassword}
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={(e) => {
          e.preventDefault();
          signUp.password === signUp.confirmPassword
            ? actions.signUp(signUp)
            : alert("Password no match");
        }}
      >
        Submit
      </button>
    </form>
  );
};
