import React, { useContext, useEffect, useState } from "react"
import { TypeContext } from "./TypeProvider"
import "./Type.css"
import { useParams, Link, useHistory } from "react-router-dom"

export const TypeDetail = () => {
    const { getTypeById, deleteType } = useContext(TypeContext)
    const [type, setType] = useState({})
    const { typeId } = useParams();
    const history = useHistory();


    useEffect(() => {

        getTypeById(typeId).then(type => setType(type)) 

    }, [typeId])

    return (
        <section className="type">
            <h3 className="type__label">{ type.label }</h3>
            <Link to ={`/types/${typeId}/edit`}><button>Edit Ticket Type</button></Link>

            <button onClick={() => deleteType(typeId).then(() => {
                history.push("/admin")})
            }>Delete Ticket Type</button>
        </section>
    
        
        )
    }