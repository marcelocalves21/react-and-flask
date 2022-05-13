import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

export const LogInForm = () => {
  const { store, actions } = useContext(Context);
  const [logIn, setLogIn] = useState({
    email: "",
    password: "",
  });
  let history = useHistory();

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
          history.push("/demo");
        }}
      >
        Submit
      </button>
    </form>
  );
};

export const SignUpForm = () => {
  const { store, actions } = useContext(Context);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUp, setSignUp] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
  });
  return (
    <form className="needs-validation">
      <div className="mb-3">
        <label htmlFor="exampleInputFirstName" className="form-label">
          First Name
        </label>
        <input
          type="input"
          className="form-control"
          id="exampleInputFirstName"
          aria-describedby="firstName"
          onChange={(e) => setSignUp({ ...signUp, firstName: e.target.value })}
          value={signUp.firstName}
          required
        />
        <div id="firstName" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputLastName" className="form-label">
          Last Name
        </label>
        <input
          type="input"
          className="form-control"
          id="exampleInputLastName"
          aria-describedby="lastName"
          onChange={(e) => setSignUp({ ...signUp, lastName: e.target.value })}
          value={signUp.lastName}
          required
        />
        <div id="lastName" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputDOB" className="form-label">
          DOB
        </label>
        <input
          type="input"
          className="form-control"
          id="exampleInputDOB"
          aria-describedby="DOB"
          onChange={(e) => setSignUp({ ...signUp, dob: e.target.value })}
          value={signUp.dob}
          required
        />
        <div id="DOB" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
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
        <label htmlFor="exampleInputConfirmPassword1" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputConfirmPassword1"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={(e) => {
          e.preventDefault();
          signUp.password === confirmPassword
            ? actions.signUp(signUp)
            : alert("Password no match");
        }}
      >
        Submit
      </button>
    </form>
  );
};
