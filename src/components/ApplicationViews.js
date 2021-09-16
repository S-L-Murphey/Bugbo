import React from "react";
import { Route } from "react-router-dom";
import { BugProvider } from "./bug/BugProvider";
import { BugList } from "./bug/BugList";
import { BugDetail } from "./bug/BugDetail";
import { TagProvider } from "./tag/TagProvider";
import { BugForm } from "./bug/BugForm";
import { StatusProvider } from "./status/StatusProvider"
import { PriorityProvider } from "./priority/PriorityProvider";

export const ApplicationViews = () => {
    return (
        <BugProvider>
            <TagProvider>
                <StatusProvider>
                    <PriorityProvider>
                        <Route exact path="/bugs">
                            <BugList />
                        </Route>

                        <Route exact path="/bugs/:bugId(\d+)">
                            <BugDetail />
                        </Route>

                        <Route exact path="/bugs/:bugId(\d+)/edit">
                            <BugForm />
                        </Route>

                        <Route exact path="/bugs/new">
                            <BugForm />
                        </Route>
                    </PriorityProvider>
                </StatusProvider>
            </TagProvider>
        </BugProvider>
    )
}
