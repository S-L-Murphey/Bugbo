import React, { useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { ProjectContext } from "./ProjectProvider"
import "./Project.css"

export const ProjectList = () => {

    const { projects, getAllProjects, setProjects } = useContext(ProjectContext);
    const { history } = useHistory();
    const loggedInUsername = localStorage.getItem("bugbo_user_username");

    useEffect(() => {
        getAllProjects().then(projects => setProjects(projects))
    }, []);

    const assigneeID = projects.filter(p => {
       const projectassignees = p.assignees.map(a =>{
           return a.user.username
            })
        let isAssigned = projectassignees.some(pa => pa === loggedInUsername)
        return isAssigned
        })

            
    console.log(assigneeID)
         


    console.log(projects)

    return (
        <section className="create__project">
            <section className="filter">
                <button className="myButton" onClick={() => {
                    getAllProjects().then(projects => setProjects(assigneeID))
                }}>View My Projects</button>
                <button className="allButton" onClick={() => {
                    getAllProjects().then(projects => setProjects(projects))
                }}>View All Projects</button>
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

                </section>
                <Link to={`/projects/new`}><button>Create New Project</button></Link>
            </section>
        </section>
    )
}
