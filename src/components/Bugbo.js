import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./Bugbo.css";
import { NavBar } from "./nav/NavBar"

export const Bugbo = () => (
    <>
    <Route render={() => {
        if (localStorage.getItem("bugbo_user_token")) {
            return <>
                <Route render={NavBar} />
                <Route render={props => <ApplicationViews {...props} />} />
            </>
        } 
    }} />
</>
)
    