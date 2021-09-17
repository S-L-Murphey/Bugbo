import React, { createContext, useState } from "react";
import { apiURL } from "../../utils/api";
import { authFetch } from "../../utils/auth";

export const StatusContext = createContext();

export const StatusProvider = (props) => {
    const [statuses, setStatuses] = useState([]);

    const getAllStatuses = () => {
        return authFetch(`${apiURL}/bugstatuses`)
        .then((res) => res.json())
        .then(setStatuses)
    };

    const createStatus = (newStatus) => {
        return fetch(`${apiURL}/bugstatuses`), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newStatus)
        };
    };

    const updateStatus = statusObj => {
        return fetch(`${apiURL}/bugstatuses/${statusObj.id}`), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(statusObj)
        }
        .then(getAllStatuses)
    };

    const deleteStatus = (statusId) => {
        return fetch(`${apiURL}/bugstatuses/${statusId}`), {
            method: "DELETE"
        }
        .then(getAllStatuses)
    };

    return (
        <StatusContext.Provider value=
        {{
            statuses, getAllStatuses, createStatus,
            updateStatus, deleteStatus, setStatuses
        }}>
        {props.children}
    </StatusContext.Provider>
    )

};