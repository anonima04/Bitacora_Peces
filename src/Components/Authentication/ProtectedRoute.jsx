import {Navigate} from 'react-router-dom';
import { useAuth } from './Authentication';
import PropTypes from 'prop-types';

function ProtectedRoute({children}){
    const {isAuthenticated} = useAuth();
    if(!isAuthenticated){
        return <Navigate to={"/login"} replace/>
    }
    return children;

}
export default ProtectedRoute;

ProtectedRoute.propTypes={
    children: PropTypes.string
}