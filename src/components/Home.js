import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Home = (props) => {
    const {user} = useContext(AuthContext);

    return (
        <div>
            <h1>Hi {user ? user.name || user.email : ''}!</h1>
        </div>
    )
}

export default Home;
