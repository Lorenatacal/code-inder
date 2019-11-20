import React from 'react'
import Styles from './card.module.css'
import { Grid } from '@material-ui/core'
import avatar from '../../Assets/7_avatar-512.png'
import javascript from '../../Assets/Languages/javascript-plain.svg'
import c from '../../Assets/Languages/c-original.svg'
import python from '../../Assets/Languages/python-original.svg'
import ruby from '../../Assets/Languages/ruby-original.svg'
import { Button } from '@material-ui/core'
import { useFirebaseDatabaseWriters, useFirebaseCurrentUser, useFirebaseDatabaseValue } from 'fireact'


function Card({ yearsOfExperience = '', language}) {
    const user = useFirebaseCurrentUser() 
    const uid = user ? user.uid : null
    const experience = yearsOfExperience.split('')
    const { update } = useFirebaseDatabaseWriters(`users/${uid}/`)
    let currentCardCounter = useFirebaseDatabaseValue(`users/${uid}/CurrentCard`)
    let imageSrc = ''
    
    switch (language) {
        case 'javascript':
            imageSrc = javascript
            break;
        case 'c':
            imageSrc = c
            break;
        case 'python':
            imageSrc = python
            break;
        case 'ruby':
            imageSrc = ruby
            break;
        default:
            imageSrc = null
            break;
    }

    return (
        <div className={Styles.cardContainer}>
            <div className={Styles.avatarContainer}>
                <img className={Styles.avatar} src={avatar}></img>
            </div>
            <label className={Styles.experience}>{`${experience[0]} - ${experience[3]} Years of experience!`}</label>
            <div className={Styles.languageContainer}>
                <img className={Styles.language} src={imageSrc}/>
            </div>
            <Button className={Styles.skip} onClick={() => update({['CurrentCard'] : ++currentCardCounter})}>Skip</Button>
            <Button className={Styles.match}>Get in touch!</Button>
        </div>
    )
}

export default Card
