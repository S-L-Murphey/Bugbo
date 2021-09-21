import React, { useContext, useState, useEffect } from "react"
import { TagContext } from "./TagProvider.js"
import { useHistory, useParams } from "react-router-dom"
import "./Tag.css"


export const TagForm = () => {
    const history = useHistory()
    const { tagId } = useParams()
    const { createTag, updateTag, getTagById} = useContext(TagContext)

    const [currentTag, setCurrentTag] = useState({
        name: "",
    })



    useEffect(() => {
        if (tagId) {
            getTagById(tagId).then(tag => {
                setCurrentTag({
                    name: tag.name
                })
            })
        }
    }, [tagId]);

    const changeTagNameState = (event) => {
        const newTagState = { ...currentTag }
        newTagState[event.target.name] = event.target.value
        setCurrentTag(newTagState)
    };

    return (
        <form className="TagForm">
            <h2 className="tagForm__name">Create New Tag</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentTag.name}
                        onChange={changeTagNameState}
                    />
                </div>
            </fieldset>

            {
                (tagId)
                    ? <button
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()

                            const tag = {
                                id: tagId,
                                name: currentTag.name,
                            }

                            // Send PUT request to your API
                            updateTag(tag)
                                .then(() => history.push("/admin"))
                        }}
                        className="btn btn-primary">Edit Tag</button>
                    :
                    <button type="submit"
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()

                            const tag = {                               
                                name: currentTag.name,
                            }

                            // Send POST request to your API
                            createTag(tag)
                                .then(() => history.push("/admin"))
                        }}
                        className="btn btn-primary">Create Tag</button>
            }
        </form>
    )
}