// import React, { createContext, useState, useEffect } from "react";

// const UserContext = createContext(null);

// const UserContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Optional: Add logic to check auth status on load

//   return (
//     <UserContext.Provider value={[user, setUser]}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export { UserContext, UserContextProvider };

import axios from "axios";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user session on first load
  useEffect(() => {
    axios
      .get("/api/user", { withCredentials: true })
      .then((res) => {
        if (res.data && res.data.name) {
          setUser(res.data);
        } else {
          setUser(null);
        }
      })
      .catch(() => {
        setUser(null); // Not logged in
      });
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
