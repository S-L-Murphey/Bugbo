import React from "react";
import { Route } from "react-router-dom";
import { BugProvider } from "./bug/BugProvider";
import { BugList } from "./bug/BugList";
import { BugDetail } from "./bug/BugDetail";
import { TagProvider } from "./tag/TagProvider";
import { BugForm } from "./bug/BugForm";
import { StatusProvider } from "./status/StatusProvider"
import { PriorityProvider } from "./priority/PriorityProvider";
import { TagList } from "./tag/TagList";
import { TagDetail } from "./tag/TagDetail";
import { TagForm } from "./tag/TagForm";
import { StatusList } from "./status/StatusList";
import { StatusDetail } from "./status/StatusDetail";
import { StatusForm } from "./status/StatusForm";
import { TypeProvider } from "./type/TypeProvider";
import { TypeList } from "./type/TypeList";
import { TypeDetail } from "./type/TypeDetail";
import { TypeForm } from "./type/TypeForm";
import { ProjectProvider } from "./project/ProjectProvider";
import { ProjectList } from "./project/ProjectList";
import { ProjectDetail } from "./project/ProjectDetail";
import { EmployeeProvider } from "./employee/EmployeeProvider";
import { ProjectForm } from "./project/ProjectForm.js";

export const ApplicationViews = () => {
    return (
        <BugProvider>
            <ProjectProvider>
                <EmployeeProvider>
                    <TagProvider>
                        <StatusProvider>
                            <PriorityProvider>
                                <TypeProvider>
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

                                    <Route exact path="/projects">
                                        <ProjectList />
                                    </Route>

                                    <Route exact path="/projects/:projectId(\d+)">
                                        <ProjectDetail />
                                    </Route>

                                    <Route exact path="/projects/new">
                                        <ProjectForm />
                                    </Route>

                                    <Route exact path="/projects/:projectId(\d+)/edit">
                                        <ProjectForm />
                                    </Route>

                                    <Route exact path="/admin">
                                        <TagList />
                                    </Route>

                                    <Route exact path="/tags/:tagId(\d+)">
                                        <TagDetail />
                                    </Route>

                                    <Route exact path="/tags/new">
                                        <TagForm />
                                    </Route>

                                    <Route exact path="/tags/:tagId(\d+)/edit">
                                        <TagForm />
                                    </Route>

                                    <Route exact path="/admin">
                                        <StatusList />
                                    </Route>

                                    <Route exact path="/statuses/:statusId(\d+)">
                                        <StatusDetail />
                                    </Route>

                                    <Route exact path="/statuses/:statusId(\d+)/edit">
                                        <StatusForm />
                                    </Route>

                                    <Route exact path="/statuses/new">
                                        <StatusForm />
                                    </Route>

                                    <Route exact path="/admin">
                                        <TypeList />
                                    </Route>

                                    <Route exact path="/types/:typeId(\d+)">
                                        <TypeDetail />
                                    </Route>

                                    <Route exact path="/types/:typeId(\d+)/edit">
                                        <TypeForm />
                                    </Route>

                                    <Route exact path="/types/new">
                                        <TypeForm />
                                    </Route>

                                </TypeProvider>
                            </PriorityProvider>
                        </StatusProvider>
                    </TagProvider>
                </EmployeeProvider>
            </ProjectProvider>
        </BugProvider>
    )
}
