import {createContext, useState} from 'react'


export const UserContext = createContext()

export const UserProvider = ({children}) => {

    const [loggedInUserContext, setLoggedInUserContext] = useState(false)
    
    return (
        <UserContext.Provider value={{loggedInUserContext, setLoggedInUserContext}}>
            {children}
        </UserContext.Provider>
    )
}