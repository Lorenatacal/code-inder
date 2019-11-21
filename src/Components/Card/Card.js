import ReactCardFlip from 'react-card-flip';
import React from 'react'
import Styles from './card.module.css'
import avatarM from '../../Assets/7_avatar-512.png'
import avatarF from '../../Assets/female1-512.png'
import javascript from '../../Assets/Languages/javascript-plain.svg'
import c from '../../Assets/Languages/c-original.svg'
import python from '../../Assets/Languages/python-original.svg'
import ruby from '../../Assets/Languages/ruby-original.svg'
import { Button } from '@material-ui/core'
import { useFirebaseDatabaseWriters, useFirebaseCurrentUser, useFirebaseDatabaseValue } from 'fireact'
import { useSpring, animated } from 'react-spring'
import { useEffect } from 'react'
import axios from 'axios';

function Card({ yearsOfExperience = '', language, gender}) {
    const user = useFirebaseCurrentUser() 
    const uid = user ? user.uid : null
    const experience = yearsOfExperience.split('')
    const { update } = useFirebaseDatabaseWriters(`users/${uid}/`)
    let currentCardCounter = useFirebaseDatabaseValue(`users/${uid}/CurrentCard`)
    let imageSrc = ''
    const [flipped, setFlipped] = React.useState(false)
    const [reseter, setReseter] = React.useState(false)
    const animProps = useSpring({opacity: 1, transform: 'translateX(0)', from: {opacity: 0, transform: 'translateX(50vw)'}, reset: true, immediate: reseter})
    const [data, setData] = React.useState()
    
    switch (language) {
        case 'javascript':
            imageSrc = javascript
            break;
        case 'c':
            imageSrc = c
            break;
        case 'pythonml':    
            imageSrc = python
            break;
        case 'pythonwebdev':
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
            
        <ReactCardFlip isFlipped={flipped} flipDirection="vertical" containerStyle={{width: '100%', height: '100%'}}>
                         
            <animated.div style={animProps} className={Styles.cardContainer}>
                  <div className={Styles.avatarContainer}>
                    <img className={Styles.avatar} src={gender === 'male' ? avatarM : avatarF}></img>
                  </div>
                <label className={Styles.experience}>{`${experience[0]} - ${experience[3]} Years of experience!`}</label>
                <div className={Styles.languageContainer}>
                  <img className={Styles.language} src={imageSrc}/>
                </div>
                  <Button 
                    className={Styles.skip} 
                    onClick={() => {
                        update({['CurrentCard'] : ++currentCardCounter})
                        setReseter(false)
                    }}>
                        Skip
                    </Button>
                  <Button 
                    className={Styles.match} 
                    onClick={() => {
                        setReseter(true)
                        setFlipped(true)
                    }
                }>
                        Get in touch!
                </Button>
            </animated.div>
                <button className={Styles.cardContainer}  onClick={() => {
                    setFlipped(false)
                }}>
                    <div className={Styles.avatarContainer}>
                        <img src='https://maps.googleapis.com/maps/api/staticmap?center=n179pt&zoom=14&size=400x400&key=API_KEY' alt="Smiley face" height="400" width="400"></img>
                    </div>
                </button>
            </ReactCardFlip>
    )
}

export default Card
