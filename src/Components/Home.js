
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dash from './Dash'
import Profile from '../Components/Profile/Profile'
import Sorting from './Sorting'


function Home() { 
    return (
        <Switch>
            <Route path='/sorting' component={Sorting}/>
            <Route path='/profile' component={Profile}/>
            <Route path='/' component={Dash}/>
        </Switch> 
    )
}
export default Home