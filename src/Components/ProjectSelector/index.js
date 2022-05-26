import { Autocomplete, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import API from '../../API';
// import { AlertsContext } from '../../Contexts/AlertsContext';
// import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import './projectSelector.scss';

const ProjectSelector = () => {
  // const { alertMsg } = useContext(AlertsContext);

  const [projectSuggestions, setProjectSuggestions] = useState([]);

  const [project, setProject] = useState({ projectId: '', projectTitle: '' });

  const getSuggestions = async () => {
    try {
      const { data } = await API.projects.getAll();
      console.log(data);
      if (data) setProjectSuggestions(data);
    } catch (error) {
      console.log(error);
      // alertMsg('error', 'Could not get projects', error);
    }
  };

  const setSelectedProject = (item) => {
    setProject({
      projectId: item.projectId,
      projectTitle: item.projectTitle
    })
  };

  return (
    <div className='container-fluid projectSelectorContainer'>
      <div className='row projectSelectorRow'>
        <div className='projectSelectorAutoComplete'>
          <Autocomplete
            options={projectSuggestions}
            sx={{ width: 400 }}
            renderInput={(params) => <TextField {...params} label="Select a Project" />}
            getOptionLabel={option => option.projectTitle}
            autoComplete
            openOnFocus
            size='small'
            value={project}
            onChange={(event, newValue) => { setSelectedProject(newValue) }}
            onFocus={() => getSuggestions()}
          />
        </div>
      </div>
    </div>
  )
};

export default ProjectSelector;
