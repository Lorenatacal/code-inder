import React from 'react'
import Styles from './nav.module.css'
import { Button } from '@material-ui/core'

function Nav( { currentPage } ) {
    return ( 
        <div className={Styles.navContainer}>
            <Button 
                className={currentPage == 'Home' ? Styles.navActive 
                                                 : Styles.navItem}  
                color='primary' 
                size='large' 
                variant='text'>
                    Home
                </Button>
            <Button className={Styles.navItem}  color='primary' size='large' variant='text'>Profile</Button>
            <Button className={Styles.navItem}  color='primary' size='large' variant='text'>Logout</Button>
        </div>
    )
}

export default Nav