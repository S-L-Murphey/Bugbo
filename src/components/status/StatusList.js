import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { StatusContext } from "./StatusProvider"
import "./Status.css"

export const StatusList = () => {

    const { statuses, getAllStatuses } = useContext(StatusContext);

    useEffect(() => {
        getAllStatuses()
    }, []);

    return (
        <article>
            <h2>Current Ticket Statuses</h2>
            <section className="main_container">

                <section className="statuses">
                    {
                        statuses.map(s => {
                            return (<section key={`statuses--${s.id}`} className="status">
                                <Link to={`/statuses/${s.id}`}>
                                    <div className="status__list">
                                        <div className="status__name">
                                            {s.name}
                                        </div>
                                    </div>
                                </Link>
                            </section>
                            )
                        })
                    }
                   
                </section>
                <Link to={`/statuses/new`}><button>Create New Status</button></Link>
            </section>
        </article>
    )
}