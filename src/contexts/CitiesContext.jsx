import {createContext, useEffect, useState} from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000"

function CitiesProvider({children}) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    console.log()
    useEffect(function () {
        async function fetchCities() {
            try {
                const res = await fetch(`${BASE_URL}/cities`)
                const data = await res.json();
                setCities(data)
            } catch {
                alert('There was an error loading data')
            } finally {
                setIsLoading(false);
            }
        }

        fetchCities();
    }, [])
    return <CitiesContext.Provider value={{cities, isLoading}}>
        {children}
    </CitiesContext.Provider>
}

export {CitiesContext, CitiesProvider}
