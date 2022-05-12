const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      registered: false,
      accessToken: undefined,
    },
    actions: {
      isRegistered: () => {
        let res = getStore().registered;
        setStore({ registered: !res });
      },
      signUp: (user) => {
        fetch(
          "https://3001-marcelocalv-reactandfla-fpiqme3yuwb.ws-us44.gitpod.io/api/user",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
            redirect: "follow",
          }
        )
          .then((response) =>
            response.ok ? setStore({ registered: true }) : ""
          )
          .catch((error) => console.log("error", error));
      },
      logIn: (user) => {
        console.log(user);
        fetch(`${process.env.BA}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
          mode: "no-cors",
          redirect: "follow",
        })
          .then((response) => response.json())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
      },
      verifyUser: (token) => {
        fetch(
          "https://3001-marcelocalv-reactandfla-fpiqme3yuwb.ws-us44.gitpod.io/api/login",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            redirect: "follow",
          }
        )
          .then((response) => response.json())
          .then((result) => setStore({ accessToken: result.access_token }))
          .catch((error) => console.log("error", error));
      },
    },
  };
};

export default getState;
