import React, { createContext } from "react";
import { apiURL } from "../../utils/api";
import { authFetch } from "../../utils/auth";


export const BugTagContext = createContext()

export const BugTagProvider = (props) => {
    const [bugTag, setBugTag] = useState([]);

    const getAllBugTags = () => {
        return authFetch(`${apiURL}/bugtags`)
        .then((res) => res.json())
        .then(setBugTag)
    }
    
    const getBugTagsByBugId = id => {
        return authFetch(`${apiURL}/bugtags?bug=${id}`)
        .then((res) => res.json())
    };

    const getBugTagsByTagId = id => {
        return authFetch(`${apiURL}/bugtags?tag=${id}`)
        .then((res) => res.json())
    }

    const createBugTag = bugTag => {
        return authFetch(`${apiURL}/bugtags`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bugTag)
        })
    };

    const updateBugTag = bugtagObj => {
        return fetch(`${apiURL}/bugtags/${bugtagObj.id}`), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bugtagObj)
        }
        .then(getAllBugTags)
    };

    const deleteBugTag = id => {
        return authFetch(`${apiURL}/bugtags/${id}`, {
            method: "DELETE"
        })
    };

    return (
        <BugTagContext.Provider
            value={{
                bugTag, getAllBugTags, getBugTagsByBugId, updateBugTag,
                getBugTagsByTagId, createBugTag, deleteBugTag, setBugTag
            }}
        >
            {props.children}
        </BugTagContext.Provider>
    );
};