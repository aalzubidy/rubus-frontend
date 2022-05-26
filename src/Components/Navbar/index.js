import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'supertokens-auth-react/recipe/emailpassword';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import SearchIcon from '@mui/icons-material/Search';
import CodeIcon from '@mui/icons-material/Code';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { ProjectContext } from '../../Contexts/ProjectContext';
import Paths from '../../AppRouter/Paths';
import './navbar.scss';
import { Tooltip } from '@mui/material';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { project } = useContext(ProjectContext);

    const handleOnClick = (evt, navigateTo) => {
        evt.preventDefault();
        navigate(navigateTo, { location, replace: true });
    }

    const handleLogout = async (evt) => {
        evt.preventDefault();
        await signOut();
        navigate('/', { location, replace: true });
    }

    return (
        <div>
            <nav className='navbar fixed-top navbar-expand-sm navbar-light'>
                <div className='container-fluid'>
                    <a className='navbar-brand mx-5' onClick={(evt) => handleOnClick(evt, Paths.home)} href='/'>
                        <img src='../../Images/rubus_logo.png' alt='rubus' height='26' className='d-inline-block align-text-top' /> Rubus
                    </a>
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                        <div className='me-auto'>
                            <div className='navbar-nav'>
                                <Tooltip title='Query Converter'>
                                    <a className='nav-link mx-2' onClick={(evt) => handleOnClick(evt, Paths.account)} href={Paths.account}>{<CompareArrowsIcon sx={{ fontSize: '26px' }} />}</a>
                                </Tooltip>
                                <Tooltip title='Search Databases'>
                                    <a className='nav-link mx-2' onClick={(evt) => handleOnClick(evt, Paths.account)} href={Paths.account}>{<SearchIcon sx={{ fontSize: '26px' }} />}</a>
                                </Tooltip>
                                <Tooltip title='Account Settings'>
                                    <a className='nav-link mx-2' onClick={(evt) => handleOnClick(evt, Paths.account)} href={Paths.account}>{<AccountCircleIcon sx={{ fontSize: '26px' }} />}</a>
                                </Tooltip>
                                <Tooltip title='Source Code & Contribution'>
                                    <a className='nav-link mx-2' href='https://github.com/aalzubidy/rubus-frontend' target='_blank' rel='noreferrer'>{<CodeIcon sx={{ fontSize: '26px' }} />}</a>
                                </Tooltip>
                                <Tooltip title='Logout'>
                                    <a className='nav-link mx-2' onClick={handleLogout} name='logout' href='/'>{<LogoutIcon sx={{ fontSize: '26px' }} />}</a>
                                </Tooltip>
                            </div>

                        </div>
                        <div className='d-flex'>
                            <div className='navbar-nav'>
                                <div className=' dropdown'>
                                    <button className='nav-link btn dropdown-toggle' id='navbarDropdown' data-bs-toggle='dropdown' aria-expanded='false'>
                                        {project ? project.title : ''} <AccountTreeIcon sx={{ fontSize: '26px' }} />
                                    </button>
                                    <ul className='dropdown-menu dropdown-menu-end' aria-labelledby='navbarDropdown'>
                                        <li><a className='dropdown-item' href={Paths.account}>Project's Users</a></li>
                                        <li><a className='dropdown-item' href={Paths.account}>Project's Requests</a></li>
                                        <li><a className='dropdown-item' href={Paths.account}>Project's Settings</a></li>
                                        <li><hr className='dropdown-divider' /></li>
                                        <li><a className='dropdown-item' href={Paths.account}>New Project</a></li>
                                        <li><a className='dropdown-item' href={Paths.account}>Switch Project</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
