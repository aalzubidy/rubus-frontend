import { Autocomplete, TextField, Modal, Tooltip } from '@mui/material';
import { useContext, useState } from 'react';
import API from '../../API';
import { AlertsContext } from '../../Contexts/AlertsContext';
import { ProjectActionsContext } from '../../Contexts/ProjectContext';
import './switchProject.scss';

const SwitchProject = ({ switchProjectDialog, setSwitchProjectDialog }) => {
  // Settings
  const { alertMsg } = useContext(AlertsContext);

  // Handle project suggestions
  const [projectSuggestions, setProjectSuggestions] = useState([]);

  // Handle selected project
  const [project, setProject] = useState({});
  const { setNewProject } = useContext(ProjectActionsContext);

  const getSuggestions = async () => {
    try {
      const { data } = await API.projects.getAll();
      if (data) setProjectSuggestions(data);
      else setProjectSuggestions([]);
    } catch (error) {
      alertMsg('error', 'Could not get projects', error);
    }
  };

  const setSelectedProject = (item) => {
    setProject({
      id: item.projectId,
      title: item.projectTitle
    })
  };

  const handleSwitchProject = () => {
    console.log(project);
    setNewProject(project);
    setSwitchProjectDialog(false);
  }

  return (
    <Modal
      open={switchProjectDialog}
      onClose={() => setSwitchProjectDialog(false)}
      disableEscapeKeyDown
      hideBackdrop
    >
      <div className='container-fluid switchProjectContainer'>
        <div className='row projectSuggestions'>
          <Tooltip title='Select one of your projects to work on, or create a new project!'>
            <Autocomplete
              options={projectSuggestions}
              renderInput={(params) => <TextField {...params} label="Select a Project" />}
              getOptionLabel={option => option.projectTitle}
              autoComplete
              openOnFocus
              size='small'
              onChange={(event, newValue) => { setSelectedProject(newValue) }}
              onFocus={() => getSuggestions()}
            />
          </Tooltip>
        </div>
        <div className='row actions'>
          <div>
            <button className='btn btn-link' onClick={() => setSwitchProjectDialog(false)}>Cancel</button>
            <button className='btn btn-outline-primary' onClick={handleSwitchProject}>Set Working Project</button>
          </div>
        </div>
      </div>
    </Modal>
  )
};

export default SwitchProject;
