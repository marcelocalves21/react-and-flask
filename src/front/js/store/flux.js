const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      registered: true,
    },
    actions: {
      isRegistered: () => {
        let res = getStore().registered;
        setStore({ registered: !res });
      },
      signUp: (user) => {
        console.log(user);
      },
      logIn: (user) => {
        console.log(user);
      },
    },
  };
};

export default getState;
