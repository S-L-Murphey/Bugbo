import React, { createContext, useState } from "react";
import { apiURL } from "../../utils/api";
import { authFetch } from "../../utils/auth";

export const TypeContext = createContext();

export const TypeProvider = (props) => {
    const [type, setType] = useState([]);

    const getAllTypes = () => {
        return authFetch(`${apiURL}/types`)
        .then((res) => res.json())
        .then(setType)
    };

    const createType = (newType) => {
        return fetch(`${apiURL}/types`), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newType)
        };
    };

    const updateType = typeObj => {
        return fetch(`${apiURL}/types/${typeObj.id}`), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(typeObj)
        }
        .then(getAllTypes)
    };

    const deleteType = (typeId) => {
        return fetch(`${apiURL}/types/${typeId}`), {
            method: "DELETE"
        }
        .then(getAllTypes)
    };

    return (
        <TypeContext.Provider value=
        {{
            type, getAllTypes, createType,
            updateType, deleteType, setType
        }}>
        {props.children}
    </TypeContext.Provider>
    )

};