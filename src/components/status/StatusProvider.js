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

    const getStatusById = (id) => {
        return authFetch(`${apiURL}/bugstatuses/${id}`).then((res) => res.json());
    };

    const createStatus = (newStatus) => {
        return fetch(`${apiURL}/bugstatuses`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("bugbo_user_token")}`,
            },
            body: JSON.stringify(newStatus)
        });
    };

    const updateStatus = statusObj => {
        return fetch(`${apiURL}/bugstatuses/${statusObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("bugbo_user_token")}`,
            },
            body: JSON.stringify(statusObj)
        })
        .then(getAllStatuses)
    };

    const deleteStatus = (statusId) => {
        return fetch(`${apiURL}/bugstatuses/${statusId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("bugbo_user_token")}`,
            },
        })
        .then(getAllStatuses)
    };

    return (
        <StatusContext.Provider value=
        {{
            statuses, getAllStatuses, createStatus,
            updateStatus, deleteStatus, setStatuses, getStatusById
        }}>
        {props.children}
    </StatusContext.Provider>
    )

};