import React, { useContext, useEffect, useState } from "react"
import { BugContext } from "./BugProvider"
import "./Bug.css"
import { useParams, Link, useHistory } from "react-router-dom"

export const BugDetail = () => {
    const { getBugById, deleteBug } = useContext(BugContext)
    const [ bug, setBug ] = useState({})
    const { bugId } = useParams();
    const history = useHistory();


    useEffect(() => {

        getBugById(bugId).then(bug => setBug(bug)) 

    }, [bugId])

    console.log(bug)

    return (
    <section className="bug">
        <h3 className="bug__title">{ bug.title }</h3>
        <div className="bug__description">{ bug.description }</div>
        <div className="bug__creator"><strong>Creator:</strong> { bug.creator?.user.username }</div>
        <div className="bug__createddate"><strong>Created Date:</strong> { bug.entry_date }</div>
        <div className="bug__status"><strong>Status:</strong> { bug.status?.name }</div>
        <div className="bug__assignee"><strong>Assignee:</strong> { bug.owner?.user.username }</div>
        <div className="bug__tags"><strong>Tags:</strong> { bug.tags?.map(t => {
            return <div>{t.name}</div>
        })}</div>
        <Link to ={`/bugs/${bugId}/edit`}><button>Edit Bug</button></Link>

        <button onClick={() => deleteBug(bugId).then(() => {
            history.push("/bugs")})
        }>Delete Bug</button>
    </section>

    
    )
}