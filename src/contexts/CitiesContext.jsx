import {createContext, useContext, useEffect, useReducer} from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000"

const initialState = {
    cities: [],
    currentCity: {},
    error: '',
    isLoading: false,
}

function reducer(state, action) {
    switch (action.type) {
        case 'loading':
            return {...state, isLoading: true}
        case 'cities/loaded':
            return {...state, isLoading: false, cities: action.payload}
        case 'cities/created':
            return {...state, isLoading: false, cities: [...state.cities, action.payload], currentCity: action.payload}
        case 'cities/deleted':
            return {...state, isLoading: false, cities: state.cities.filter((city) => city.id !== action.payload)}
        case 'city/loaded':
            return {...state, isLoading: false, currentCity: action.payload}
        case 'rejected':
            return {...state, isLoading: false, error: action.payload}
        default:
            throw new Error('No such action type')
    }
}


function CitiesProvider({children}) {
    // const [cities, setCities] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [currentCity, setCurrentCity] = useState({});
    const [{cities, isLoading, currentCity}, dispatch] = useReducer(reducer, initialState);
    useEffect(function () {
        async function fetchCities() {
            try {
                const res = await fetch(`${BASE_URL}/cities`)
                const data = await res.json();
                dispatch({type: 'cities/loaded', payload: data});
            } catch (e) {
                dispatch({type: 'rejected', error: e.message})
            }
        }

        fetchCities();
    }, [])

    async function getCity(id) {
        try {
            dispatch({type: 'loading'});
            const res = await fetch(`${BASE_URL}/cities/${id}`)
            const data = await res.json();
            dispatch({type: 'city/loaded', payload: data})
        } catch (e) {
            dispatch({type: 'rejected', payload: e.message})
        }

    }

    async function setCity(newCity) {
        try {
            dispatch({type: 'loading'});
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const city = await res.json();

            dispatch({type: 'cities/created', payload: city});

        } catch(error) {
            dispatch({type: 'rejected', payload: error.payload})
        }

    }

    async function deleteCity(id) {
        try {
            dispatch({type: 'loading'});
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
            })
            // const city = await res.json();
            dispatch({type: 'cities/deleted', payload: id})

        } catch(error) {
            dispatch({type: 'rejected', payload: error.message})
        }
    }

    return <CitiesContext.Provider value={{cities, isLoading, getCity, currentCity, setCity, deleteCity}}>
        {children}
    </CitiesContext.Provider>
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error("Cities context was used outside cities provider")
    return context;
}

export {useCities, CitiesProvider}
