import React, { useContext } from 'react';
import HomeLogin from './components/HomeLogin';
import Home from './components/Home';
import { AuthContext } from './contexts/AuthContext';

const RubusApp = (props) => {
    const token = useContext(AuthContext);

    return (
        <div>
            {!token ? <HomeLogin /> : <Home />}
        </div>
    )
};

export default RubusApp;
