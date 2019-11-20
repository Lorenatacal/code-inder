
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dash from './Dash'
import Profile from '../Components/Profile/Profile'
import ApiCall from './ApiCall'


function Home() { 
    return (
        <Switch>
            <Route path='/api-call' component={ApiCall}/>
            <Route path='/profile' component={Profile}/>
            <Route path='/' component={Dash}/>
        </Switch> 
    )
}
export default Home