import React from 'react';
import './App.css';
import Home from './Components/Home'
import Login from './Components/Login/Login'
import { useFirebaseCurrentUser } from 'fireact'


function App() {
  const user = useFirebaseCurrentUser()
  return (
      user ? <Home/> : <Login/>
  );
}

export default App;
