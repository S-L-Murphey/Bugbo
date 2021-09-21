import React, { useContext, useState, useEffect } from "react"
import { StatusContext } from "./StatusProvider.js"
import { useHistory, useParams } from "react-router-dom"
import "./Status.css"


export const StatusForm = () => {
    const history = useHistory()
    const { statusId } = useParams()
    const { createStatus, updateStatus, getStatusById} = useContext(StatusContext)

    const [currentStatus, setCurrentStatus] = useState({
        name: "",
    })



    useEffect(() => {
        if (statusId) {
            getStatusById(statusId).then(status => {
                setCurrentStatus({
                    name: status.name
                })
            })
        }
    }, [statusId]);

    const changeStatusNameState = (event) => {
        const newStatusState = { ...currentStatus }
        newStatusState[event.target.name] = event.target.value
        setCurrentStatus(newStatusState)
    };

    return (
        <form className="statusForm">
            <h2 className="statusForm__name">Create New Status</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentStatus.name}
                        onChange={changeStatusNameState}
                    />
                </div>
            </fieldset>

            {
                (statusId)
                    ? <button
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()

                            const status = {
                                id: statusId,
                                name: currentStatus.name,
                            }

                            // Send PUT request to your API
                            updateStatus(status)
                                .then(() => history.push("/admin"))
                        }}
                        className="btn btn-primary">Edit Status</button>
                    :
                    <button type="submit"
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()

                            const status = {                               
                                name: currentStatus.name,
                            }

                            // Send POST request to your API
                            createStatus(status)
                                .then(() => history.push("/admin"))
                        }}
                        className="btn btn-primary">Create Status</button>
            }
        </form>
    )
}