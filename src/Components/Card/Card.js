import ReactCardFlip from 'react-card-flip';
import React from 'react'
import Styles from './card.module.css'
import avatar from '../../Assets/7_avatar-512.png'
import javascript from '../../Assets/Languages/javascript-plain.svg'
import c from '../../Assets/Languages/c-original.svg'
import python from '../../Assets/Languages/python-original.svg'
import ruby from '../../Assets/Languages/ruby-original.svg'
import { Button } from '@material-ui/core'
import { useFirebaseDatabaseWriters, useFirebaseCurrentUser, useFirebaseDatabaseValue } from 'fireact'
import axios from 'axios';
import * as geolib from 'geolib';


function Card({ yearsOfExperience = '', language}) {
    const user = useFirebaseCurrentUser() 
    const uid = user ? user.uid : null
    const experience = yearsOfExperience.split('')
    const { update } = useFirebaseDatabaseWriters(`users/${uid}/`)
    let currentCardCounter = useFirebaseDatabaseValue(`users/${uid}/CurrentCard`)
    let imageSrc = ''
    const [flipped, setFlipped] = React.useState(false)
    const [data, setData] = React.useState()

    const coordinates = geolib.getCenter([
        { latitude: 51.586529, longitude: -0.057410},
        { latitude: 51.491680, longitude: -0.016840 },
    ]);

    const midLatitude = Math.round(coordinates.latitude * 1000000) / 1000000
    const midLongitude = Math.round(coordinates.longitude * 1000000) / 1000000


    console.log(midLatitude, midLongitude, 'middlePoint')
    
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

    let l = 51.539106
    let lo = -0.037103
    const imageSource = `https://maps.googleapis.com/maps/api/staticmap?center=${l},${lo}&zoom=14&size=400x400&key=${process.env.REACT_APP_CODEINDER_API_KEY}`
    
    return (
        <ReactCardFlip isFlipped={flipped} flipDirection="vertical" containerStyle={{width: '100%', height: '100%'}}>
            <div className={Styles.cardContainer}>
                  <div className={Styles.avatarContainer}>
                    <img className={Styles.avatar} src={avatar}></img>
                  </div>
                <label className={Styles.experience}>{`${experience[0]} - ${experience[3]} Years of experience!`}</label>
                <div className={Styles.languageContainer}>
                  <img className={Styles.language} src={imageSrc}/>
                </div>
                  <Button className={Styles.skip} onClick={() => update({['CurrentCard'] : ++currentCardCounter})}>Skip</Button>
                  {/* <Button className={Styles.match} onClick={() => setFlipped(true)}>Get in touch!</Button> */}
                  <Button className={Styles.match} onClick={() => {
                       setFlipped(true)
                       axios
                           .get(`https://maps.googleapis.com/maps/api/staticmap?center=${l},${lo}&size=400x400&key=${process.env.REACT_APP_CODEINDER_API_KEY}`)
                           .then(response => {
                               console.log(response, 'response')
                               setData(response.data);
                           })
                   }}>Get in touch!</Button>
                  
                </div>
                <button className={Styles.cardContainer}  onClick={() => {
                    setFlipped(false)
                }}>
                    <div className={Styles.avatarContainer}>
                        <img src={imageSource} alt="map" height="400" width="400"></img>
                    </div>
                </button>
            </ReactCardFlip>
    )
    
}

export default Card
