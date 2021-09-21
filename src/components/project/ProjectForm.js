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
        getAllEmployees()
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
        //make copy of currentProject Object
        const newProjectAssignees = {...currentProject}
        //return the first element in the assignees array that equals click event
        const foundAssignee = newProjectAssignees.assignees.find(pt => pt === parseInt(event.target.id))
        //if the array includes what was clicked on...
        if (foundAssignee) {
            //return the index number of the first appearance of the event target id
            const foundAssigneePosition = newProjectAssignees.assignees.indexOf(foundAssignee)
            //starting from that index, delete it
            newProjectAssignees.assignees.splice(foundAssigneePosition, 1)
        } else {
            newProjectAssignees.assignees.push(parseInt(event.target.id))
        }
        setCurrentProject(newProjectAssignees)
    }


    const handleBugInputChange = (event) => {
        const newProjectBugs = {...currentProject}
        const foundBug = newProjectBugs.bugs.find(pt => pt === parseInt(event.target.id))
        if (foundBug) {
            const foundBugPosition = newProjectBugs.bugs.indexOf(foundBug)
            newProjectBugs.bugs.splice(foundBugPosition, 1)
        } else {
            newProjectBugs.bugs.push(parseInt(event.target.id))
        }
        setCurrentProject(newProjectBugs)
    }



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
                                        checked={currentProject.assignees.find(pa => pa.id === e.id)} />
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
                                        checked={currentProject.bugs.find(pb => pb.id === b.id)} />
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
                                id: parseInt(projectId),
                                name: currentProject.name,
                                description: currentProject.description,
                                assignees: currentProject.assignees,
                                bugs: currentProject.bugs
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
                                assignees: currentProject.assignees,
                                bugs: currentProject.bugs
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