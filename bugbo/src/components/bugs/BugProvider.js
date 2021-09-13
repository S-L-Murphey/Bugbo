import React, { createContext, useState } from "react";
import { apiURL } from "../../utils/api";
import { authFetch } from "../../utils/auth";

export const BugContext = createContext();

export const BugProvider = (props) => {
    const [searchTerms, setSearchTerms] = useState([]);
    const [bug, setBug] = useState(null);

    const getAllBugs = () => {
        return authFetch(`${apiURL}/bugs`).then((res) => res.json());
    };

    const getBugById = (id) => {
        return authFetch(`${apiURL}/bugs/${id}`).then((res) => res.json());
    };

    const deleteBug = (id) => {
        return authFetch(`${apiURL}/bugs/${id}`, {
            method: "DELETE",
        });
    };

    const createBug = (bug) => {
        return authFetch(`${apiURL}/bugs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bug),
        }).then((res) => res.json());
    };

    const updateBug = (bug) => {
        return authFetch(`${apiURL}/bug/${bug.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bug),
        });
    };

    return (
        <BugContext.Provider
          value={{
            getAllBugs, getBugById, createBug, updateBug,
            deleteBug, bug, setBug, searchTerms, setSearchTerms
          }}
        >
          {props.children}
        </BugContext.Provider>
      );
};