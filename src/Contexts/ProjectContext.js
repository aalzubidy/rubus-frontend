import React, { createContext, useState } from "react";

export const ProjectContext = createContext();

export const ProjectActionsContext = createContext();

export function ProjectProvider(props) {
  const [project, setProject] = useState({ id: '', title: '' });

  const setNewProject = (newProject) => {
    if (newProject && newProject.id && newProject.title) setProject(newProject);
    else return false;
  }

  return (
    <ProjectContext.Provider value={{ project }}>
      <ProjectActionsContext.Provider value={{ setNewProject }}>
        {props.children}
      </ProjectActionsContext.Provider>
    </ProjectContext.Provider>
  );
}
