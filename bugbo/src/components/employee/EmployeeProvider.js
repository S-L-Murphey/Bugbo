import React, { createContext } from "react";
import { apiURL } from "../../utils/api";
import { authFetch } from "../../utils/auth";

export const EmployeeContext = createContext();

export const EmployeeProvider = (props) => {
  const getEmployeeById = (id) => {
    return authFetch(`${apiURL}/employees/${id}`).then((res) => res.json());
  };

  return (
    <EmployeeContext.Provider
      value={{
        getEmployeeById
      }}
    >
      {props.children}
    </EmployeeContext.Provider>
  );
};