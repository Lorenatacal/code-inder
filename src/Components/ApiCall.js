import React from 'react';
import axios from 'axios';
import { useFirebaseDatabaseWriters, useFirebaseCurrentUser, useFirebaseDatabaseValue } from 'fireact'


function ApiCall() {
    const user = useFirebaseCurrentUser()
    const uid = user ? user.uid : null
    const currentUser = useFirebaseDatabaseValue(`users/${uid}/Profile/postcode`)
    console.log(currentUser, 'user')
    return (
        <>
        <button
            onClick={(e) => {
                e.preventDefault()
                axios
                .get(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${currentUser}&key=AIzaSyCbyYIxp_EPw2MHXdz6QinG7NhSurjDKAk`
                )
                .then(response => {
                    console.log(response, 'coordinates')
                });
            }}
        >
            get coordinates
        </button>
        </>
    )

}

export default ApiCall;