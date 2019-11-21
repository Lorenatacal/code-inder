import React from 'react';
import Styles from './contactForm.module.css'



function ContactForm() { 
    return (
        <form className={Styles.cardContainer}>
            <p>Meeting date</p>
                <input
                    type="date"
                />
            <p>Time of meeting</p>
        <input
                type="time"
        />
        <p>Location</p>
        <button>Invite</button>
  </form>
    )
}
export default ContactForm