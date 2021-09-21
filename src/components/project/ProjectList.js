import React, { useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { ProjectContext } from "./ProjectProvider"
import "./Project.css"

export const ProjectList = () => {

    const { projects, getAllProjects } = useContext(ProjectContext);
    const { history } = useHistory();

    useEffect(() => {
        getAllProjects()
    }, []);

    console.log(projects)

    return (
        <section className="projects">
            {
                projects.map(p => {
                    return (<section key={`project--${p.id}`} className="project">
                        <div className="project__list">
                            <Link to={`/projects/${p.id}`}>
                                <h2 className="project__title">
                                    {p.name}
                                </h2>
                            </Link>
                            <div className="project__count">
                                <h4>Attached Tickets:</h4> {p.bugs.length}
                            </div>
                        </div>
                    </section>
                    )
                })
            }
            <Link to={`/projects/new`}><button>Create New Project</button></Link>
        </section>
    )
}
