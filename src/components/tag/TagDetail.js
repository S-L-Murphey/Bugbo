import React, { useContext, useEffect, useState } from "react"
import { TagContext } from "./TagProvider"
import "./Tag.css"
import { useParams, Link, useHistory } from "react-router-dom"

export const TagDetail = () => {
    const { getTagById, deleteTag } = useContext(TagContext)
    const [tag, setTag ] = useState({})
    const { tagId } = useParams();
    const history = useHistory();


    useEffect(() => {

        getTagById(tagId).then(tag => setTag(tag)) 

    }, [tagId])

    return (
        <section className="tag">
            <h3 className="tag__name">{ tag.name }</h3>
            <Link to ={`/tags/${tagId}/edit`}><button>Edit Tag</button></Link>

            <button onClick={() => deleteTag(tagId).then(() => {
                history.push("/tags")})
            }>Delete Tag</button>
        </section>
    
        
        )
    }