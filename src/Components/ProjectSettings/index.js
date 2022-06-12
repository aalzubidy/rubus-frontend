import { useContext, useEffect, useState } from 'react';
import { ProjectContext } from '../../Contexts/ProjectContext';
import { AlertsContext } from '../../Contexts/AlertsContext';
import API from '../../API';
import './projectSettings.scss';
import { Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ProjectSettings = () => {
  const { alertMsg } = useContext(AlertsContext);
  const genericError = 'Project Settings - uknown error, check console logs for details';
  const { project } = useContext(ProjectContext);
  const [refreshRequired, setRefreshRequired] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const getProjectInformation = async () => {
    try {
      const { data } = await API.projects.getProject(project.id);
      if (data) {
        setNewTitle(data.projectTitle);
        setNewDescription(data.projectDescription);
      }
    } catch (error) {
      alertMsg('error', 'could not get project information', error.message || genericError, error);
    }
  };

  const updateProject = async () => {
    alertMsg('info', 'please wait, updating project information');
    try {
      const { data } = await API.projects.updateProject(project.id, { title: newTitle, description: newDescription });
      if (data) {
        alertMsg('success', 'Updated project information');
        setRefreshRequired(true);
      }
    } catch (error) {
      alertMsg('error', 'could not update project information', error.message || genericError, error);
    }
  };

  const deleteProject = async () => {
    const proceed = window.confirm(`Are you sure you want to delete project ${project.title}?`);
    if (!proceed) {
      return;
    }

    alertMsg('info', 'please wait, deleting project');
    try {
      await API.projects.deleteProject(project.id);
      setRefreshRequired(true);
      alertMsg('success', 'Deleted project');
    } catch (error) {
      alertMsg('error', 'could not delete project', error.message || genericError, error);
    }
  };

  useEffect(() => {
    getProjectInformation();
  }, [project, refreshRequired]);

  return (
    <div className='container-fluid projectSettings'>
      <div className='row'>
        <div className='projectInformationDiv'>
          <div>
            <Tooltip title={`Update project's title`}>
              <input className='form-control projectInformationInput' type='text' name='newTitle' id='newTitle' value={newTitle} onChange={(evt) => setNewTitle(evt.target.value)} placeholder="Project's title" />
            </Tooltip>
          </div>
          <div>
            <Tooltip title={`Update project's description`}>
              <input className='form-control projectInformationInput' type='text' name='newDescription' id='newDescription' value={newDescription} onChange={(evt) => setNewDescription(evt.target.value)} placeholder="Project's decription" />
            </Tooltip>
          </div>

          <button className='btn btn-outline-primary' onClick={updateProject}>Update Project Information</button>

          <hr />

          <div>
            <button className='btn btn-danger' onClick={deleteProject}>{<DeleteIcon />} Delete Project</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectSettings;