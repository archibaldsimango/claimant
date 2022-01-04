import {createContext, useContext, useReducer} from 'react'

//the data layer
export const StateContext = createContext()

//the provider
export const StateProvider = ({reducer, initialState, children}) =>(
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

//using the values stored in state
export const useStateValue = () =>useContext(StateContext)