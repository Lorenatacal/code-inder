import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { logoutUser } from '../Redux/Actions/auth'
import { useDispatch } from 'react-redux'

function Home() { 

    const dispatch = useDispatch()

    return (
        <>
        <h1>HOME!</h1>
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