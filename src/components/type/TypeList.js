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
        <section className="Types">
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
            <Link to ={`/types/new`}><button>Create New Ticket Type</button></Link>
        </section>
    )
}