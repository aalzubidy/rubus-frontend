import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';

function PrivateRoute({ children, ...rest }) {
    const token = useContext(AuthContext);

    return (
        <Route {...rest} render={({ location }) => {
            return token ? children : <Redirect to={{ pathname: '/', state: { from: location } }} />
        }} />
    )
}

export default PrivateRoute;
