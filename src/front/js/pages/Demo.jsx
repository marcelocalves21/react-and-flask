import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Demo = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      {store.accessToken ? (
        <div className="container">
          <h1>Demo page</h1>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <h1>
            You need to <strong>Log In</strong> to be able to see this page
          </h1>
        </div>
      )}
    </>
  );
};
