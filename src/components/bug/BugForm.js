import React, { useContext, useState, useEffect } from "react"
import { BugContext } from "./BugProvider.js"
import { TagContext } from "../tag/TagProvider.js"
import { StatusContext } from "../status/StatusProvider.js"
import { useHistory, useParams } from "react-router-dom"
import { PriorityContext } from "../priority/PriorityProvider.js"

export const BugForm = () => {
    const history = useHistory();
    const { bugId } = useParams();
    const { createBug, getBugTypes, bugTypes, editBug, getBugById } = useContext(BugContext);
    const { tags, getAllTags } = useContext(TagContext);
    const { statuses, getAllStatuses } = useContext(StatusContext);
    const { priority, getAllPriorities } = useContext(PriorityContext);
    const [bugTags, setBugTags] = useState([]);

    const [currentBug, setCurrentBug] = useState({
        title: "",
        description: "",
        entry_date: "",
        creator: localStorage.getItem("bugbo_user_token"),
        status: 4,
        priority: 0,
        type: 0,
        tags: []
    })

    useEffect(() => {
        getBugTypes()
    }, [])

    useEffect(() => {
        getAllStatuses()
    }, [])

    useEffect(() => {
        getAllTags()
    }, [])

    useEffect(() => {
        getAllPriorities()
    }, [])

    useEffect(() => {
        if (bugId) {
            getBugById(bugId).then(bug => {
                setCurrentBug({
                    title: bug.title,
                    description: bug.description,
                    entry_date: bug.entry_date,
                    creator: bug.creator,
                    status: bug.status.name,
                    priority: bug.priority,
                    type: bug.type,
                    tags: bug.tags
                })
            })
        }
    }, [bugId])

    const handleTagInputChange = (event) => {
        const newBugTags = currentBug.tags
        /*const foundBugTag = newBugTags.find(pt => pt.id === parseInt(event.target.id))
        if (foundBugTag) {
            const foundBugTagPosition = newBugTags.indexOf(foundBugTag)
            newBugTags.splice(foundBugTagPosition, 1)
        } else {
            newBugTags.push({ id: parseInt(event.target.id), name: event.target.value })
        }*/
        setBugTags(newBugTags)
    }

    const changeBugState = (event) => {
        const newBugState = {...currentBug }
        newBugState[event.target.name] = event.target.value
        setCurrentBug(newBugState)
    }

    return (
        <form className="bugForm">
            <h2 className="bugForm__name">Create New Bug</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentBug.title}
                        onChange={changeBugState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentBug.description}
                        onChange={changeBugState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="priority">Priority: </label>
                    <select type="select" name="priority" required autoFocus className="form-control"
                        value={currentBug.priority}
                        onChange={changeBugState}>
                        <option value="0">Select Priority Level</option>
                        {priority.map((element => {
                            return <option value={element.id}>
                                {element.label}
                            </option>
                        }))}
                    </select>

                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="type">Bug Type: </label>
                    <select type="select" name="type" required autoFocus className="form-control"
                        value={currentBug.type}
                        onChange={changeBugState}>
                        <option value="0">Select Bug Type</option>
                        {bugTypes.map((element => {
                            return <option value={element.id}>
                                {element.label}
                            </option>
                        }))}
                    </select>

                </div>
            </fieldset>

            <fieldset>
                <div className="form-group tags">
                    <h4>Tags</h4>
                    {tags.map(t => {
                            return (
                                <>
                                    <input type="checkbox" id={t.id} required autoFocus value={t.name} onChange={handleTagInputChange}
                                        checked={bugTags.find(pt => pt.id === t.id)} />
                                    <label htmlFor={t.id}>{t.name}</label>
                                </>
                            )
                        } 
                    )}
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="entry_date">Date of Entry: </label>
                    <input type="date" name="entry_date" required autoFocus className="form-control"
                        value={currentBug.entry_date}
                        onChange={changeBugState}
                    />
                </div>
            </fieldset>

            {
                (bugId)
                    ? <button
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()

                            const bug = {
                                id: bugId,
                                creator: currentBug.maker,
                                title: currentBug.title,
                                description: currentBug.description,
                                entry_date: currentBug.entry_date,
                                type: parseInt(currentBug.type),
                                tags: bugTags,
                                priority: currentBug.priority
                                
                            }

                            // Send PUT request to your API
                            editBug(bug)
                                .then(() => history.push("/bugs"))
                        }}
                        className="btn btn-primary">Edit Bug</button>
                    :
                    <button type="submit"
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()

                            const bug = {
                                creator: currentBug.creator,
                                title: currentBug.title,
                                description: currentBug.description,
                                entry_date: currentBug.entry_date,
                                type: parseInt(currentBug.type),
                                tags: bugTags,
                                priority: parseInt(currentBug.priority)
                            }

                            // Send POST request to your API
                            createBug(bug)
                                .then(() => history.push("/bugs"))
                        }}
                        className="btn btn-primary">Submit New Bug</button>
            }
        </form>
    )

}