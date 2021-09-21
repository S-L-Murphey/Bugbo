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
           </ul>)}