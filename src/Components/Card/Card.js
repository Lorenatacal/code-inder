import React from 'react'
import Styles from './card.module.css'
import { Grid } from '@material-ui/core'
import avatar from '../../Assets/7_avatar-512.png'
import ReactCardFlip from 'react-card-flip';


function Card() {
    const [flipped, setFlipped] = React.useState(false)
    return (
        <div>
            <ReactCardFlip isFlipped={flipped} flipDirection="vertical">
                <button className={Styles.cardContainer} onClick={() => {
                    setFlipped(true)
                }}>
                    <div className={Styles.avatarContainer}>
                        <img className={Styles.avatar} src={avatar}></img>
                    </div>
                </button>
                <button className={Styles.cardContainer}  onClick={() => {
                    setFlipped(false)
                }}>
                    <div className={Styles.avatarContainer}>
                        <p>Back Card</p>
                    </div>
                </button>
            </ReactCardFlip>
        </div>
    )
}

export default Card
