import {createContext, useState} from 'react';

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState({roleName: 'guest', id: 0});
    const updateUser = (user) => setUser(user);
  return (
    <UserContext.Provider value={{user:user, updateUser:updateUser}}>
        {children}      
    </UserContext.Provider>
  )
};

export {UserContext, UserProvider};
