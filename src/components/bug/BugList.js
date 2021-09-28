import React, { useEffect, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BugContext } from "./BugProvider"
import "./Bug.css"

export const BugList = () => {

    const { bugs, getAllBugs, getBugsByCreator, setBugs, getBugsBySearch, searchTerms } = useContext(BugContext);
    const loggedInUsername = localStorage.getItem("bugbo_user_username");
    const [userBugs, setUserBugs] = useState([]);


    useEffect(() => {
        getAllBugs()
    }, []);

    const creatorID = bugs?.find(b => {
        if (b.creator.user.username === loggedInUsername) {
            return b.creator.id
        }
    });

    /*useEffect(() => {
        if (searchTerms !== "") {
            setBugs(getBugsBySearch(searchTerms))
            const subset = bugs.filter(bug => bug.title.toLowerCase().includes(searchTerms.toLowerCase()))
            setBugs(subset)
        }else 
        {setBugs(bugs)}
    }, [searchTerms]);*/

    return (
        <section className="create__bug">
            <section className="filter">
                <button className="myButton" onClick={() => {
                    getBugsByCreator(creatorID.creator.id).then(bugs => setBugs(bugs))
                }}>View My Tickets</button>
                <button className="allButton" onClick={() => {
                    getAllBugs()
                }}>View All Tickets</button>
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
        </section >
    )

}

