import React, { createContext, useState } from "react";
import { apiURL } from "../../utils/api";
import { authFetch } from "../../utils/auth";

export const TagContext = createContext();

export const TagProvider = (props) => {
    const [tags, setTags] = useState([]);

    const getAllTags = () => {
        return authFetch(`${apiURL}/tags`)
        .then((res) => res.json())
        .then(setTags)
    };

    const getTagById = (id) => {
        return authFetch(`${apiURL}/tags/${id}`).then((res) => res.json());
    };

    const createTag = (newTag) => {
        return fetch(`${apiURL}/tags`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("bugbo_user_token")}`,
            },
            body: JSON.stringify(newTag)
        })
            .then(getAllTags)
    };

    const updateTag = tagObj => {
        return fetch(`${apiURL}/tags/${tagObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("bugbo_user_token")}`,
            },
            body: JSON.stringify(tagObj)
        })
            .then(getAllTags)
    };

    const deleteTag = (tagId) => {
        return fetch(`${apiURL}/tags/${tagId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("bugbo_user_token")}`,
            },
        })
        .then(getAllTags)
    };

    return (
        <TagContext.Provider value=
        {{
            tags, getAllTags, createTag,
            updateTag, deleteTag, setTags, getTagById
        }}>
        {props.children}
    </TagContext.Provider>
    )

};