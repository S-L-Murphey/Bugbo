import React, { createContext, useState } from "react";
import { apiURL } from "../../utils/api";
import { authFetch } from "../../utils/auth";

export const ProjectContext = createContext();

export const ProjectProvider = (props) => {
    const [projects, setProjects] = useState([]);

    const getAllProjects = () => {
        return authFetch(`${apiURL}/projects`).then((res) => res.json())
    };

    const getProjectById = (id) => {
        return authFetch(`${apiURL}/projects/${id}`).then((res) => res.json());
    };

    const deleteProject = (id) => {
        return authFetch(`${apiURL}/projects/${id}`, {
            method: "DELETE",
        });
    };

    const createProject = (project) => {
        return authFetch(`${apiURL}/projects`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(project),
        }).then((res) => res.json());
    };

    const updateProject = (project) => {
        return fetch(`${apiURL}/projects/${project.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("bugbo_user_token")}`,
          },
          body: JSON.stringify(project),
        });
    };

    return (
        <ProjectContext.Provider
          value={{
            projects, getAllProjects, getProjectById, createProject, 
            updateProject, deleteProject, setProjects
          }}
        >
          {props.children}
        </ProjectContext.Provider>
      );
};