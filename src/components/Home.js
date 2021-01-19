import React from 'react';
import { withRouter, useHistory } from "react-router-dom";
import Navbar from '../Navbar';

const Home = () => {
    const history = useHistory();

    const handleOnClick = (evt) => {
        evt.preventDefault();
        history.push(`/${evt.target.name}`);
    }

    return (
        <div>
            <Navbar /> <br/><br/><br/><br/>
            <button onClick={handleOnClick} name="queryConverter">Query Converter</button> <br /><br />
            <button onClick={handleOnClick} name="searchArticles">Search Articles</button> <br /><br />
            <button onClick={handleOnClick} name="projectArticles">Project's Articles</button> <br /><br />
            <button onClick={handleOnClick} name="projectRequests">Project Requests</button> <br /><br />
            <button onClick={handleOnClick} name="projectManagement">Project Management</button> <br /><br />
            <button onClick={handleOnClick} name="accountSettings">Account Settings</button> <br /><br />
        </div>
    )
}

export default withRouter(Home);
