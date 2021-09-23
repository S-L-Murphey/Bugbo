import React, { useContext, useEffect, useState } from "react"
import { ProjectContext } from "./ProjectProvider"
import "./Project.css"
import { useParams, Link, useHistory } from "react-router-dom"

export const ProjectDetail = () => {
    const { getProjectById, deleteProject } = useContext(ProjectContext)
    const [ project, setProject ] = useState({})
    const { projectId } = useParams();
    const history = useHistory();


    useEffect(() => {
        getProjectById(projectId).then(project => setProject(project)) 
    }, [projectId])

    return (
    <section className="project">
        <h3 className="project__name">{ project.name }</h3>
        <div className="project__description">{ project.description }</div>
        <div className="project__assignees"><strong>Assignees:</strong>{ project.assignees?.map(a => {
            return <div>{a.user.username}, </div>
        })} </div>
        <div className="project__bugs"><strong>Bugs:</strong> { project.bugs?.map(b => {
            return <Link to ={`/bugs/${b.id}`}><div>{b.title}</div></Link>
        })}</div>
        <Link to ={`/projects/${projectId}/edit`}><button>Edit project</button></Link>

        <button onClick={() => deleteProject(projectId).then(() => {
            history.push("/projects")})
        }>Delete Project</button>
    </section>

    
    )
}