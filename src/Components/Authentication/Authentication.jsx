import {createContext, useState, useContext} from 'react';
const AuthContext = createContext();
import PropTypes from 'prop-types';

export function Authentication({children}){
    const [isAuthenticated, setAuthenticated]= useState(false);

    const login = ()=> setAuthenticated(true);
    const logout = ()=> setAuthenticated(false);

    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
export function useAuth() {
    return useContext(AuthContext);
}

Authentication.propTypes={
    children: PropTypes.node
}