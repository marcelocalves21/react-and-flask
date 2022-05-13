const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      registered: false,
      user: {},
    },
    actions: {
      isRegistered: () => {
        let res = getStore().registered;
        setStore({ registered: !res });
      },
      signUp: (user) => {
        fetch(`${process.env.BACKEND_URL}/api/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(user),
          mode: "no-cors",
          redirect: "follow",
        })
          .then((response) =>
            response.ok ? setStore({ registered: true }) : ""
          )
          .catch((error) => console.log("error", error));
      },
      logIn: (user) => {
        fetch(`${process.env.BACKEND_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
          redirect: "follow",
        })
          .then((response) => response.json())
          .then((result) => getActions().verifyUser(result.access_token))
          .catch((error) => console.log("error", error));
      },
      verifyUser: (token) => {
        fetch(`${process.env.BACKEND_URL}/api/protected`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          redirect: "follow",
        })
          .then((response) => response.json())
          .then((result) => setStore({ user: result }))
          .catch((error) => console.log("error", error));
      },
    },
  };
};

export default getState;
