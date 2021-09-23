import React, { useContext, useEffect, useState } from "react"
import { ProjectContext } from "./ProjectProvider"
import "./Project.css"
import { useParams, Link, useHistory } from "react-router-dom"

export const ProjectDetail = () => {
    const { getProjectById, deleteProject} = useContext(ProjectContext)
    const [ project, setProject ] = useState({})
    const { projectId } = useParams();
    const history = useHistory();
    const loggedInUsername = localStorage.getItem("bugbo_user_username");


    useEffect(() => {
        getProjectById(projectId).then(project => setProject(project)) 
    }, [projectId])

    
    const assignedBugs = project.bugs?.filter(b => b.owner.user.username === loggedInUsername)
        
    return (
    <section className="create_project">
          <section className="filter">
                <button className="myButton" onClick={() => {
                   const copy = {...project}
                   copy.bugs = assignedBugs
                   setProject(copy)
                }}>View My Assigned Tickets</button>
                <button className="allButton" onClick={() => {
                    getProjectById(projectId).then(project => setProject(project)) 
                }}>View All Project Tickets</button>
    <section className="project">
        <h3 className="project__name">{ project.name }</h3>
        <div className="project__description">{ project.description }</div>
        <div className="project__assignees"><strong>Assignees:</strong>{ project.assignees?.map(a => {
            return <div>{a.user.username}, </div>
        })} </div>
        <div className="project__bugs"><strong>Bugs:</strong> { project.bugs?.map(b => {
            return <Link to ={`/bugs/${b.id}`}><div className="project__bugs__div">{b.title}</div></Link>
        })}</div>
        <Link to ={`/projects/${projectId}/edit`}><button>Edit project</button></Link>

        <button onClick={() => deleteProject(projectId).then(() => {
            history.push("/projects")})
        }>Delete Project</button>
    </section>
    </section>
    </section>
    
    )
}