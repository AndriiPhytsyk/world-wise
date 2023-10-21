import  {createContext, useContext, useReducer} from 'react';

const AuthContext = createContext();

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState = {
    isAuthed: false,
    user:  null
}

function reducer(state, action) {
    switch (action.type) {
        case "login":
            return {...state, isAuthed: true, user: action.payload}
        case "logout":
            return initialState
        default: throw new Error("No such action type")
    }

}
function AuthProvider({children}) {

    const [{isAuthed, user}, dispatch] =  useReducer(reducer, initialState);

    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({type: 'login', payload: FAKE_USER});
            console.log(user);
        }
    }

    function logout() {
        dispatch({type: 'logout'});
    }


    return (
       <AuthContext.Provider value = {{isAuthed, user, login, logout}}>{children}</AuthContext.Provider>
    );
}

function useAuthContext () {
    const context = useContext(AuthContext);
    if (!context) throw new Error('Use outside the context');
    return context;

}

export {AuthProvider, useAuthContext};
