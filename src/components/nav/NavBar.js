import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link to="/">Home</Link>
            </li>
            <li className="navbar__item">
                <Link to="/bugs">Bugs</Link>
            </li>
            <li className="navbar__item">
            <Link to="/projects">Projects</Link>
            </li>
            <li className="navbar__item">
            <Link to="/admin">Admin</Link>
            </li>

            {
                (localStorage.getItem("bugbo_user_token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("bugbo_user_token")
                                props.history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }

           </ul>)}