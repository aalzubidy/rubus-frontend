import React, { createContext, useState } from "react";

export const ProjectContext = createContext();

export const ProjectActionsContext = createContext();

export function ProjectProvider(props) {
  const [project, setProject] = useState(JSON.parse(localStorage.getItem('RubusSelectedProject')) || { id: '', title: '' });

  const setNewProject = (newProject) => {
    if (newProject && newProject.id && newProject.title) {
      setProject(newProject);
      localStorage.setItem('RubusSelectedProject', JSON.stringify(newProject));
    }
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
