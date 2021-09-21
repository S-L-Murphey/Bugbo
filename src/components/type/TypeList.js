import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { TypeContext } from "./TypeProvider"
import "./Type.css"

export const TypeList = () => {

    const { types, getAllTypes } = useContext(TypeContext);

    useEffect(() => {
        getAllTypes()
    }, []);

    return (

        <article>
            <h2>Current Ticket Types</h2>
            <section className="main_container">
                <section className="types">
                    {
                        types.map(t => {
                            return (<section key={`type--${t.id}`} className="type">
                                <Link to={`/types/${t.id}`}>
                                    <div className="type__list">
                                        <div className="type__label">
                                            {t.label}
                                        </div>
                                    </div>
                                </Link>
                            </section>
                            )
                        })
                    }
    
                </section>
                <Link to={`/types/new`}><button>Create New Ticket Type</button></Link>
            </section>
            
        </article>
    )
}