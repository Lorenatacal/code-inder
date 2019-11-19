import React from 'react'
import Styles from './login.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../Redux/Actions'
import { Redirect } from 'react-router-dom'
import { TextField, FormGroup, Button, FormLabel } from '@material-ui/core'
import logo from '../../Assets/image.png'

function Login() {

    const [password, setPassword] = React.useState()
    const [email, setEmail] = React.useState()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const dispatch = useDispatch()

    if(isAuthenticated){
        return <Redirect to='/'/>
    } else return (
        <div className={Styles.mainContainer}>
            <div className={Styles.loginFormContainer}>
                <div className={Styles.loginForm}>
                    <div className={Styles.logoContainer}>
                        <img className={Styles.logo} src={logo}/>
                    </div>
                    <FormGroup>
                        <TextField 
                            className={Styles.tInput} 
                            type='email' 
                            label='Email' 
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            >
                        </TextField> 
                        <TextField
                            className={Styles.tInput} 
                            type='password' 
                            label='Password' 
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            >
                        </TextField>
                        <FormLabel className={Styles.tLabel} >Forgot Password?</FormLabel>
                        <Button 
                            className={Styles.bInput} 
                            variant='text' 
                            size='large'
                            onClick={() => dispatch(loginUser(email, password))}
                            >
                                Login
                        </Button>
                        <FormLabel className={Styles.tLabel}>Need an account? Sign up here!</FormLabel>
                    </FormGroup>
                </div>
            </div>
        </div>
    )
}

export default Login