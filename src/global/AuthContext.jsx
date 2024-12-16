import React, {createContext, useState} from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [currentUser,setCurrentUser] = useState(null);

    const login = (userToken,username) => {
        setToken(userToken);
        setCurrentUser(username)
    };

    const logout = () => {
        setToken(null);
    };

    const user = (user) => {
        setCurrentUser(user)
    };

    return (
        <AuthContext.Provider value={{ token, login, logout,user, currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
