import React, { useContext, useState, useEffect } from "react"
import { TypeContext } from "./TypeProvider.js"
import { useHistory, useParams } from "react-router-dom"
import "./Type.css"


export const TypeForm = () => {
    const history = useHistory()
    const { typeId } = useParams()
    const { createType, updateType, getTypeById} = useContext(TypeContext)

    const [currentType, setCurrentType] = useState({
        label: "",
    })



    useEffect(() => {
        if (typeId) {
            getTypeById(typeId).then(type => {
                setCurrentType({
                    label: type.label
                })
            })
        }
    }, [typeId]);

    const changeTypeNameState = (event) => {
        const newTypeState = { ...currentType }
        newTypeState[event.target.name] = event.target.value
        setCurrentType(newTypeState)
    };

    return (
        <form className="typeForm">
            <h2 className="typeForm__name">Create New Ticket Type</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="label">Label: </label>
                    <input type="text" name="label" required autoFocus className="form-control"
                        value={currentType.label}
                        onChange={changeTypeNameState}
                    />
                </div>
            </fieldset>

            {
                (typeId)
                    ? <button
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()

                            const type = {
                                id: typeId,
                                label: currentType.label,
                            }

                            // Send PUT request to your API
                            updateType(type)
                                .then(() => history.push("/types"))
                        }}
                        className="btn btn-primary">Edit Ticket Type</button>
                    :
                    <button type="submit"
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()

                            const type = {                               
                                label: currentType.label,
                            }

                            // Send POST request to your API
                            createType(type)
                                .then(() => history.push("/types"))
                        }}
                        className="btn btn-primary">Create Ticket Type</button>
            }
        </form>
    )
}