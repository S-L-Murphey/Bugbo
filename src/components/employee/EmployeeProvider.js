import React, { createContext, useState } from "react";
import { apiURL } from "../../utils/api";
import { authFetch } from "../../utils/auth";

export const EmployeeContext = createContext();

export const EmployeeProvider = (props) => {
  const [employees, setEmployees] = useState([]);

  const getEmployeeById = (id) => {
    return authFetch(`${apiURL}/employees/${id}`).then((res) => res.json());
  };

  const getAllEmployees = () => {
    return authFetch(`${apiURL}/employees`).then((res) => res.json())
    .then(setEmployees)
  };

  return (
    <EmployeeContext.Provider
      value={{
        getEmployeeById, getAllEmployees, employees, setEmployees
      }}
    >
      {props.children}
    </EmployeeContext.Provider>
  );
};