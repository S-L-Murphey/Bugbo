import React, { createContext, useState } from "react";
import { apiURL } from "../../utils/api";
import { authFetch } from "../../utils/auth";

export const TypeContext = createContext();

export const TypeProvider = (props) => {
    const [types, setType] = useState([]);

    const getAllTypes = () => {
        return authFetch(`${apiURL}/bugtypes`)
        .then((res) => res.json())
        .then(setType)
    };

    const getTypeById = (id) => {
        return authFetch(`${apiURL}/bugtypes/${id}`).then((res) => res.json());
    };

    const createType = (newType) => {
        return fetch(`${apiURL}/bugtypes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("bugbo_user_token")}`,
            },
            body: JSON.stringify(newType)
        });
    };

    const updateType = typeObj => {
        return fetch(`${apiURL}/bugtypes/${typeObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("bugbo_user_token")}`,
            },
            body: JSON.stringify(typeObj)
        })
        .then(getAllTypes)
    };

    const deleteType = (typeId) => {
        return fetch(`${apiURL}/bugtypes/${typeId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("bugbo_user_token")}`
            },
        })
        .then(getAllTypes)
    };

    return (
        <TypeContext.Provider value=
        {{
            types, getAllTypes, createType,
            updateType, deleteType, setType, getTypeById
        }}>
        {props.children}
    </TypeContext.Provider>
    )

};