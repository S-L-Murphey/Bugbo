import React, { useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { BugContext } from "./BugProvider"
import "./Bug.css"

export const BugList = () => {

    const { bugs, getAllBugs } = useContext(BugContext);
    const { history } = useHistory();

    useEffect(() => {
        getAllBugs()
    }, []);

    console.log(bugs)

    return (
        <section className="bugs">
            {
                bugs.map(b => {
                    return (<section key={`bug--${b.id}`} className="bug">
                        <Link to={`/bugs/${b.id}`}>
                            <div className="bug__list">
                                <div className="bug__title">
                                    {b.title}
                                </div>

                                <div className="bug__status">
                                    Bug Status: {b.status.name}
                                </div>
                                <div className="bug__creator">
                                    Added By: {b.creator.user.username}
                                </div>
                            </div>
                        </Link>
                    </section>
                    )
                })
            }
            <Link to ={`/bugs/new`}><button>Create New Bug Ticket</button></Link>
        </section>
    )
}

