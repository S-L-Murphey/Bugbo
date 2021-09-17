import React, { useContext, useEffect, useState } from "react"
import { BugContext } from "./BugProvider"
import "./Bug.css"
import { useParams, Link } from "react-router-dom"

export const BugDetail = () => {
    const { getBugById } = useContext(BugContext)
    const [ bug, setBug ] = useState({})
    const { bugId } = useParams();


    useEffect(() => {

        getBugById(bugId).then(bug => setBug(bug)) 

    }, [bugId])

    console.log(bug)

    return (
    <section className="bug">
        <h3 className="bug__title">{ bug.title }</h3>
        <div className="bug__description">{ bug.description }</div>
        <div className="bug__createddate">Created Date: { bug.entry_date }</div>
        <div className="bug__status">Status: { bug.status?.name }</div>
        <div className="bug__creator">Creator: { bug.creator?.user.username }</div>
        <div className="bug__creator">Assignee: { bug.owner?.user.username }</div>
        <div className="bug__tags">Tags: { bug.tags?.map(t => {
            return <div>{t.name}</div>
        })}</div>
        <Link to ={`/bugs/${bugId}/edit`}><button>Edit Bug</button></Link>
    </section>

    
    )
}