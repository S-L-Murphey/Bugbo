import React from "react";
import { Route } from "react-router-dom";
import { BugProvider } from "./bug/BugProvider";
import { BugList } from "./bug/BugList";
import { BugDetail } from "./bug/BugDetail";
import { TagProvider } from "./tag/TagProvider";
import { BugForm } from "./bug/BugForm";
import { StatusProvider } from "./status/StatusProvider"
import { PriorityProvider } from "./priority/PriorityProvider";
import { ProjectProvider } from "./project/ProjectProvider";
import { ProjectList } from "./project/ProjectList";
import { ProjectDetail } from "./project/ProjectDetail";
import { ProjectForm } from "./project/ProjectForm";
import { EmployeeProvider } from "./employee/EmployeeProvider";

export const ApplicationViews = () => {
    return (
        <BugProvider>
            <ProjectProvider>
                <EmployeeProvider>
                    <TagProvider>
                        <StatusProvider>
                            <PriorityProvider>
                                <Route exact path="/bugs">
                                    <BugList />
                                </Route>

                                <Route exact path="/projects">
                                    <ProjectList />
                                </Route>

                                <Route exact path="/projects/:projectId(\d+)">
                                    <ProjectDetail />
                                </Route>

                                <Route exact path="/projects/:projectId(\d+)/edit">
                                    <ProjectForm />
                                </Route>

                                <Route exact path="/projects/new">
                                    <ProjectForm />
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
                </EmployeeProvider>
            </ProjectProvider>
        </BugProvider>
    )
}
