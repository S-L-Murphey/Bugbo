import React, { useContext, useState, useEffect } from "react"
import { ProjectContext } from "./ProjectProvider.js"
import { useHistory, useParams } from "react-router-dom"
import { EmployeeContext } from "../employee/EmployeeProvider.js"
import { BugContext } from "../bug/BugProvider.js"


export const ProjectForm = () => {
    const history = useHistory();
    const { projectId } = useParams();
    const { createProject, updateProject, getProjectById } = useContext(ProjectContext);
    const { employees, getAllEmployees, setEmployees } = useContext(EmployeeContext);
    const { bugs, getAllBugs } = useContext(BugContext);
    const [projectAssignees, setProjectAssignees] = useState([]);
    const [projectBugs, setProjectBugs] = useState([]);

    const [currentProject, setCurrentProject] = useState({
        name: "",
        description: "",
        assignees: [],
        bugs: []
    })

    useEffect(() => {
        getAllEmployees().then(employees => setEmployees(employees))
    }, [])

    useEffect(() => {
        getAllBugs()
    }, [])

    useEffect(() => {
        if (projectId) {
            getProjectById(projectId).then(project => {
                setCurrentProject({
                    name: project.name,
                    description: project.description,
                    assignees: project.assignees,
                    bugs: project.bugs
                })
            })
        }
    }, [projectId])

    const handleAssigneeInputChange = (event) => {
        const newProjectAssignees = currentProject.assignees
        const foundAssignee = newProjectAssignees.find(pt => pt.id === parseInt(event.target.id))
        if (foundAssignee) {
            const foundAssigneePosition = newProjectAssignees.indexOf(foundAssignee)
            newProjectAssignees.splice(foundAssigneePosition, 1)
        } else {
            newProjectAssignees.push({ id: parseInt(event.target.id)})
        }
        setProjectAssignees(newProjectAssignees)
    }

    console.log(projectAssignees)

    const handleBugInputChange = (event) => {
        const newProjectBugs = currentProject.bugs
        const foundBug = newProjectBugs.find(pt => pt.id === parseInt(event.target.id))
        if (foundBug) {
            const foundBugPosition = newProjectBugs.indexOf(foundBug)
            newProjectBugs.splice(foundBugPosition, 1)
        } else {
            newProjectBugs.push({ id: parseInt(event.target.id)})
        }
        setProjectBugs(newProjectBugs)
    }

    console.log(projectBugs)

    const changeProjectState = (event) => {
        const newProjectState = {...currentProject }
        newProjectState[event.target.name] = event.target.value
        setCurrentProject(newProjectState)
    }

    return (
        <form className="projectForm">
            <h2 className="projectForm__name">Create New Project</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentProject.name}
                        onChange={changeProjectState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentProject.description}
                        onChange={changeProjectState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group assignees">
                    <h4>Assignees</h4>
                    {employees.map(e => {
                            return (
                                <>
                                    <input type="checkbox" id={e.id} required autoFocus value={e.user.username} onChange={handleAssigneeInputChange}
                                        checked={projectAssignees.find(pa => pa.id === e.id)} />
                                    <label htmlFor={e.id}>{e.user.username}</label>
                                </>
                            )
                        } 
                    )}
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group Bugs">
                    <h4>Bugs</h4>
                    {bugs.map(b => {
                            return (
                                <>
                                    <input type="checkbox" id={b.id} required autoFocus value={b.title} onChange={handleBugInputChange}
                                        checked={projectBugs.find(pb => pb.id === b.id)} />
                                    <label htmlFor={b.id}>{b.title}</label>
                                </>
                            )
                        } 
                    )}
                </div>
            </fieldset>


            {
                (projectId)
                    ? <button
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()

                            const project = {
                                id: projectId,
                                name: currentProject.name,
                                description: currentProject.description,
                                assignees: projectAssignees,
                                bugs: projectBugs
                            }

                            // Send PUT request to your API
                            updateProject(project)
                                .then(() => history.push("/projects"))
                        }}
                        className="btn btn-primary">Edit Project</button>
                    :
                    <button type="submit"
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()

                            const project = {
                                name: currentProject.name,
                                description: currentProject.description,
                                assignees: projectAssignees,
                                bugs: projectBugs
                            }

                            // Send POST request to your API
                            createProject(project)
                                .then(() => history.push("/projects"))
                        }}
                        className="btn btn-primary">Submit New Project</button>
            }
        </form>
    )

}