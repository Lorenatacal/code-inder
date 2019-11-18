import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import Fireact from 'fireact'

var firebaseConfig = {
    apiKey: "AIzaSyAxTX-TIVSQmpMnN04SiAVycf3YLJGhI18",
    authDomain: "codeinder1.firebaseapp.com",
    databaseURL: "https://codeinder1.firebaseio.com",
    projectId: "codeinder1",
    storageBucket: "codeinder1.appspot.com",
    messagingSenderId: "386304959609",
    appId: "1:386304959609:web:ce90fca161ea2a430d60a8",
    measurementId: "G-6GSTB1WEXC"
  };
 

  const products = [
    'auth',
    'database'
  ]


  const {
    firebase: myFirebase, 
    Provider: FirebaseProvider, 
    middleWare
  } = Fireact(firebaseConfig, products)

  export {
    myFirebase,
    FirebaseProvider
  }
  
  // export const myFirebase = firebase.initializeApp(firebaseConfig)
  const baseDb = myFirebase.database
  export const db = baseDb