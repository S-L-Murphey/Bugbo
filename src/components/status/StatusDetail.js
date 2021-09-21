import React, { useContext, useEffect, useState } from "react"
import { StatusContext } from "./StatusProvider"
import "./Status.css"
import { useParams, Link, useHistory } from "react-router-dom"

export const StatusDetail = () => {
    const { getStatusById, deleteStatus } = useContext(StatusContext)
    const [status, setStatus ] = useState({})
    const { statusId } = useParams();
    const history = useHistory();


    useEffect(() => {

        getStatusById(statusId).then(status => setStatus(status)) 

    }, [statusId])

    return (
        <section className="status">
            <h3 className="status__name">{ status.name }</h3>
            <Link to ={`/statuses/${statusId}/edit`}><button>Edit Status</button></Link>

            <button onClick={() => deleteStatus(statusId).then(() => {
                history.push("/admin")})
            }>Delete Status</button>
        </section>
    
        
        )
    }