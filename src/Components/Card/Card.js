import React from 'react'
import Styles from './card.module.css'
import { Grid } from '@material-ui/core'
import avatar from '../../Assets/7_avatar-512.png'


function Card() {
    return (
        <div className={Styles.cardContainer}>
            <div className={Styles.avatarContainer}>
                <img className={Styles.avatar} src={avatar}></img>
            </div>
        </div>
    )
}

export default Card
