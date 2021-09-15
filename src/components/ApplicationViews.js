import React from "react";
import { Route } from "react-router-dom";
import { BugProvider } from "./bug/BugProvider";
import { BugList } from "./bug/BugList";
import { BugDetail } from "./bug/BugDetail";

export const ApplicationViews = () => {
    return (
        <BugProvider>
            <Route exact path="/">
            <BugList />
            </Route>
            <Route exact path="/bugs/:bugId(\d+)">
                <BugDetail />
            </Route>
        </BugProvider>
    )
}
