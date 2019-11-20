import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Styles from './home.module.css'
import { logoutUser } from '../Redux/Actions/auth'
import { useDispatch } from 'react-redux'
import Nav from './Nav/Nav'
import Card from './Card/Card'
import Profile from './Profile/Profile'

function Home() { 

    const dispatch = useDispatch()
    

    return (
        <>
            <Switch>
                <Route path='/profile' component={Profile}/>
            </Switch>
            <div className={Styles.mainContainer}>
                <div className={Styles.navContainer}>
                    <Nav currentPage='Home'/>
                </div>
                <div className={Styles.cardContainer}>
                    <Card></Card>
                </div>
            </div>
        </>
    )
}

export default Home