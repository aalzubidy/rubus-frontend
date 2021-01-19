import React, { useContext } from 'react';
import { withRouter, useHistory } from "react-router-dom";
import { AuthContext } from './contexts/AuthContext';

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const history = useHistory();

    const handleOnClick = (evt) => {
        evt.preventDefault();
        history.push(`/${evt.target.name}`);
    }

    return (
        <div>
            <h1>Hi {user ? user.name || user.email : ''}!</h1>
            <button onClick={handleOnClick} name="queryConverter">Query Converter</button>
            <button onClick={handleOnClick} name="searchArticles">Search Articles</button>
            <button onClick={handleOnClick} name="projectArticles">Project's Articles</button>
            <button onClick={handleOnClick} name="projectRequests">Project Requests</button>
            <button onClick={handleOnClick} name="projectManagement">Project Management</button>
            <button onClick={handleOnClick} name="accountSettings">Account Settings</button>
        </div>
    );
}

export default withRouter(Navbar);
