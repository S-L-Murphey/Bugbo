import React, { useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { TagContext } from "./TagProvider"
import "./Tag.css"

export const TagList = () => {

    const { tags, getAllTags } = useContext(TagContext);
    const { history } = useHistory();

    useEffect(() => {
        getAllTags()
    }, []);

    return (
        <article>
            <h2>Current Ticket Tags</h2>
            <section className="main_container">
                <section className="tags">
                    {
                        tags.map(t => {
                            return (<section key={`tags--${t.id}`} className="tag">
                                <Link to={`/tags/${t.id}`}>
                                    <div className="tag__list">
                                        <div className="tag__name">
                                            {t.name}
                                        </div>
                                    </div>
                                </Link>
                            </section>
                            )
                        })
                    }
                    
                </section>
                <Link to={`/tags/new`}><button>Create New Tag</button></Link>
            </section>
        </article>
    )
}
