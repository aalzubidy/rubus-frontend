import React, { memo, useState, useContext, useEffect } from 'react';
import useInputState from '../hooks/useInputState';
import { AuthContext } from '../contexts/AuthContext';
import api from '../ApiRequest';

const AccountSettings = () => {
    const { token, user } = useContext(AuthContext);
    const [oldPassword, updateOldPassword] = useInputState('');
    const [newPassword, updateNewPassword] = useInputState('');

    const [name, updateName, resetName, overWriteName] = useInputState('');
    const [organization, updateOrganization, resetOrganization, overwriteOrganization] = useInputState('');

    const [passwordMessage, updatePasswordMessage] = useState('');
    const [informationMessage, updateInformationMessage] = useState('');

    // const getUser = async () => {
    //     try {
    //         const test = await api(token).get('/user/details');
    //         console.log(test);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    useEffect(() => {
        if (user && user.name) {
            overWriteName(user.name);
        }
        if (user && user.organization) {
            overwriteOrganization(user.organization);
        }
    }, [user]);

    const handlePasswordSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const response = await api(token).put('/users/password', { oldPassword, newPassword });
            updatePasswordMessage(response.message);
        } catch (error) {
            updatePasswordMessage(`Could not update password :( ${error}`)
        }
    }

    const handleInformationSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const response = await api(token).put('/users', { name, organization, email: user.email });
            updatePasswordMessage(response.message);
            overWriteName(name);
            overwriteOrganization(organization);
        } catch (error) {
            updateInformationMessage(`Could not update information :( ${error}`)
        }
    }

    return (
        <div>
            {user ? <div>

                <div>
                    <form onSubmit={handlePasswordSubmit}>
                        <input type='password' name='oldPassword' value={oldPassword} onChange={updateOldPassword} placeholder='Current password ...' />
                        <br />
                        <input type='password' name='newPassword' value={newPassword} onChange={updateNewPassword} placeholder='New password ...' />
                        <br />
                        <button disabled={!oldPassword || !newPassword}>Update Password</button>
                        {passwordMessage ? <h1>{passwordMessage}</h1> : ''}
                    </form>
                </div>

                <br />

                <div>
                    <form onSubmit={handleInformationSubmit}>
                        <input type='text' name='name' value={name} onChange={updateName} placeholder='Name ...' />
                        <br />
                        <input type='text' name='organization' value={organization} onChange={updateOrganization} placeholder='Organization ...' />
                        <br />
                        <button disabled={!name || !organization}>Update Information</button>
                        {informationMessage ? <h1>{informationMessage}</h1> : ''}
                    </form>
                </div>

            </div> : <h2>'Loading...'</h2>}
        </div >
    )
};

export default memo(AccountSettings);
