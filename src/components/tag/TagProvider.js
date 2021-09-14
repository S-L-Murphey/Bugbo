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

    const createTag = (newTag) => {
        return fetch(`${apiURL}/tags`), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTag)
        };
    };

    const updateTag = tagObj => {
        return fetch(`${apiURL}/tags/${tagObj.id}`), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tagObj)
        }
        .then(getAllTags)
    };

    const deleteTag = (tagId) => {
        return fetch(`${apiURL}/tags/${tagId}`), {
            method: "DELETE"
        }
        .then(getAllTags)
    };

    return (
        <TagContext.Provider value=
        {{
            tags, getAllTags, createTag,
            updateTag, deleteTag, setTag
        }}>
        {props.children}
    </TagContext.Provider>
    )

};