import { createContext, useState, useEffect } from "react";

const DataContext = createContext({})

export const DataProvider = ({ children }) => {
    const [auth, setAuth] = useState({})
    const [userData, setData] = useState({})

    const clearContext = () => {
        setData({})
    }

    return (
        <DataContext.Provider value={{
            userData, setData, clearContext
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext