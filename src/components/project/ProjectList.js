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
                        <Link to={`/projects/${p.id}`}>
                            <div className="project__list">
                                <div className="project__title">
                                    {p.name}
                                </div>
                                <div className="project__count">
                                    Bug Count: {p.bugs.length}
                                </div>
                            </div>
                        </Link>
                    </section>
                    )
                })
            }
            <Link to ={`/projects/new`}><button>Create New Project</button></Link>
        </section>
    )
}
