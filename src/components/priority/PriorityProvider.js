import React, { createContext, useState } from "react";
import { apiURL } from "../../utils/api";
import { authFetch } from "../../utils/auth";

export const PriorityContext = createContext();

export const PriorityProvider = (props) => {
    const [priority, setPriority] = useState([]);

    const getAllPriorities = () => {
        return authFetch(`${apiURL}/priorities`)
        .then((res) => res.json())
        .then(setPriority)
    };

    const createPriority = (newPriority) => {
        return fetch(`${apiURL}/priorities`), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPriority)
        };
    };

    const updatePriority = priorityObj => {
        return fetch(`${apiURL}/prioritiess/${priorityObj.id}`), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(priorityObj)
        }
        .then(getAllPriorities)
    };

    const deletePriority = (priorityId) => {
        return fetch(`${apiURL}/priorities/${priorityId}`), {
            method: "DELETE"
        }
        .then(getAllPriorities)
    };

    return (
        <PriorityContext.Provider value=
        {{
            priority, getAllPriorities, createPriority,
            updatePriority, deletePriority, setPriority
        }}>
        {props.children}
    </PriorityContext.Provider>
    )

};