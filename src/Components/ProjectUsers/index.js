import { useContext, useEffect, useState } from 'react';
import { ProjectContext } from '../../Contexts/ProjectContext';
import { AlertsContext } from '../../Contexts/AlertsContext';
import API from '../../API';
import './projectUsers.scss';
import { Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';

const ProjectUsers = () => {
  const { alertMsg } = useContext(AlertsContext);
  const genericError = 'Project Users - uknown error, check console logs for details';
  const { project } = useContext(ProjectContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshRequired, setRefreshRequired] = useState(false);

  const [newUserEmail, setNewUserEmail] = useState('');

  const getProjectUsers = async () => {
    setLoading(true);
    try {
      const { data } = await API.projects.getProject(project.id);
      if (data?.users) {
        setUsers(data.users);
      }
    } catch (error) {
      alertMsg('error', 'could not get project users', error.message || genericError, error);
    }
    setLoading(false);
  };

  const addProjectUser = async () => {
    setLoading(true);
    alertMsg('info', 'please wait, adding user to project');
    try {
      const { data: userData } = await API.user.getUserByEmail(newUserEmail);
      if (!userData) {
        alertMsg('error', 'could not find user');
        return;
      }

      const { data } = await API.projects.addProjectUsers(project.id, { projectUsers: [newUserEmail] });
      if (data) {
        setRefreshRequired(true);
        alertMsg('success', 'Added user to project');
      }
    } catch (error) {
      alertMsg('error', 'could not get project users', error.message || genericError, error);
    }
    setLoading(false);
  };

  const deleteProjectUser = async (deleteUserEmail) => {
    const proceed = window.confirm(`Are you sure you want to remove ${deleteUserEmail} from project ${project.title}?`);
    if (!proceed) {
      return;
    }

    setLoading(true);
    alertMsg('info', 'please wait, deleting user from project');
    try {
      await API.projects.deleteProjectUsers(project.id, { projectUsers: [deleteUserEmail] });
      setRefreshRequired(true);
      alertMsg('success', 'Deleted user to project');
    } catch (error) {
      alertMsg('error', 'could not delete project users', error.message || genericError, error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProjectUsers();
  }, [project, refreshRequired]);

  return (
    <div className='container-fluid projectUsers'>
      <div className='row'>
        <div className='userEmailDiv'>
          <Tooltip title={`Enter user's email address to add user to the project`}>
            <input className='form-control' type='text' name='newUserEmail' id='newUserEmail' value={newUserEmail} onChange={(evt) => setNewUserEmail(evt.target.value)} placeholder="Enter user's email" />
          </Tooltip>
          <button className='btn btn-outline-primary' onClick={addProjectUser}>Add User</button>
        </div>
      </div>
      <div className='row'>
        <DataGrid
          rows={users}
          columns={[
            {
              field: 'name',
              headerName: 'Name',
              flex: 1
            },
            {
              field: 'email',
              headerName: 'Email',
              flex: 1
            },
            {
              field: 'organization',
              headerName: 'Organization',
              flex: 1
            },
            {
              field: 'id',
              headerName: 'Delete',
              flex: 0,
              renderCell: (params) => {
                return <button className='btn btn-outline-danger' onClick={() => { deleteProjectUser(params.row.email) }}><DeleteIcon sx={{ fontSize: '24px' }} /></button>
              }
            },
          ]}
          loading={loading}
          className='projectUsersDataGrid'
          autoPageSize
          disableSelectionOnClick
        />
      </div>
    </div>
  )
}

export default ProjectUsers;