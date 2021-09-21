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
        <section className="create__bug">
            <section className="bugs">
                {
                    bugs.map(b => {
                        return (<section key={`bug--${b.id}`} className="bug">
                            <div className="bug__list">
                                <Link to={`/bugs/${b.id}`}>
                                    <h2 className="bug__title">
                                        {b.title}
                                    </h2></Link>

                                <div className="bug__status">
                                    <h4>Bug Status:</h4> {b.status.name}
                                </div>
                                <div className="bug__creator">
                                    <h4>Added By:</h4> {b.creator.user.username}
                                </div>
                            </div>

                        </section>
                        )
                    })
                }
            </section>
            <Link to={`/bugs/new`}><button>Create New Bug Ticket</button></Link>
        </section>
    )

}

