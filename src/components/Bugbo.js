import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./Bugbo.css";
import { NavBar } from "./nav/NavBar"

export const Bugbo = () => (
    <>
    <h1 className="title">BUGBO</h1>
        <Route render={() => {
            if (localStorage.getItem("bugbo_user_token")) {
                return <>
                    <Route render={NavBar} />
                    <Route render={props => <ApplicationViews {...props} />} />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={Login} />
        <Route path="/register" render={Register} />
    </>
)
