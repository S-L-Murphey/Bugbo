import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (


        <ul className="navbar">
            <li className="navbar__item">
                <Link to="/bugs" className="link">Bugs</Link>
            </li>
            <li className="navbar__item">
                <Link to="/projects" className="link">Projects</Link>
            </li>
            <li className="navbar__item">
                <Link to="/admin" className="link">Admin</Link>
            </li>


            {
                (localStorage.getItem("bugbo_user_token") !== null) ?
                    <li className="navbar__item">
                        <Link to="/login">
                            <p className="link"
                                onClick={() => {
                                    localStorage.removeItem("bugbo_user_token")
                                    props.history.push({ pathname: "/" })
                                }}
                            >Logout</p>
                        </Link>
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

        </ul>)
}