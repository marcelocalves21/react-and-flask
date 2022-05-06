import React, { useState, useContext } from "react";
import { LogInForm, SignUpForm } from "../component/Form.jsx";
import { Context } from "../store/appContext.js";

import "../../styles/LogIn.css";

export const LogIn = () => {
  const { store, actions } = useContext(Context);
  return (
    <div className="d-flex">
      <section className="text-white bg-dark page align-middle d-flex align-items-center justify-content-center">
        <h1 className="text">Authentication Page</h1>
      </section>
      <section className="d-flex align-items-center justify-content-center ms-5">
        {store.registered ? <LogInForm /> : <SignUpForm />}
      </section>
    </div>
  );
};
