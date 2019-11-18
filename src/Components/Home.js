import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { logoutUser } from '../Redux/Actions/auth'
import { useDispatch } from 'react-redux'
import Questionnaire from './Questionnaire';

function Home() { 

    const dispatch = useDispatch()

    return (
        <>
        <h1>HOME!</h1>
        <Questionnaire />
        <button onClick={(e) => {
            dispatch(logoutUser())
        }}>logout</button>
        
        </>
        // <Switch>
        //     <Route path='/' component={Home}/>
        // </Switch>
    )
}

export default Home