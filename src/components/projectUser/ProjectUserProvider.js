import React, { createContext } from "react";
import { apiURL } from "../../utils/api";
import { authFetch } from "../../utils/auth";


export const ProjectUserContext = createContext()

export const ProjectUserProvider = (props) => {
    const [projectUser, setProjectUser] = useState([]);

    const getAllProjectUsers = () => {
        return authFetch(`${apiURL}/projectusers`)
        .then((res) => res.json())
        .then(setProjectUser)
    }
    
    const getProjectUsersByUserId = id => {
        return authFetch(`${apiURL}/projectusers?user=${id}`)
        .then((res) => res.json())
    };

    const getProjectUsersByProjectId = id => {
        return authFetch(`${apiURL}/projectusers?project=${id}`)
        .then((res) => res.json())
    }

    const createProjectUser = projectUser => {
        return authFetch(`${apiURL}/projectusers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projectUser)
        })
    };

    const updateProjectUser = projectUserObj => {
        return fetch(`${apiURL}/projectusers/${projectUserObj.id}`), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projectUserObj)
        }
        .then(getAllProjectUsers)
    };

    const deleteProjectUser = id => {
        return authFetch(`${apiURL}/projectusers/${id}`, {
            method: "DELETE"
        })
    };

    return (
        <ProjectUserContext.Provider
            value={{
                projectUser, getAllProjectUsers, getProjectUsersByUserId, 
                updateProjectUser, getProjectUsersByProjectId, createProjectUser, deleteProjectUser, setProjectUser
            }}
        >
            {props.children}
        </ProjectUserContext.Provider>
    );
};