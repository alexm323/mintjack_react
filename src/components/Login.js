import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import axios from 'axios'
import {Link, Redirect} from "react-router-dom";
import FormField from './FormField';
import Button from './Button';


const Login = () => {

    const styles ={
        hero:{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: `100%`,
            padding: '1.777rem'
        },
        landing: {
            backgroundColor: `aliceblue`,
            display: `flex`,
            flexDirection: `row`,
            flexFlow: 'row wrap',
        },
        marginTop: {
            marginTop: '1.777rem'
        },
        form:{
            backgroundColor: `rgba(3, 4, 94, 1)`,
            width: `70%`,
            padding: '4.209rem',
            borderRadius: '1rem',
        },
        nav:{
            padding: '4.209rem',
            width: '100%',
            position: 'fixed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }

    const {loggedInUserContext, setLoggedInUserContext} = useContext(UserContext)

    // checks for logged in user and redirects to table if it finds one
    useEffect(()=>{
        axios.get('https://blackjackmint.herokuapp.com/loggedInUser', {withCredentials: true})
        .then(res => {
            console.log(res.data)
            if(Object.keys(res.data).length > 0){
                setLoggedInUserContext(true)
            }
        })
    }, [])

    const [values, setValues] = useState({
        email: '',
        password: '',
        })


    function updateValue(e){
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmitFile = (e) => {
        e.preventDefault()
        loginToAccount()
    }

    const loginToAccount = () => {
        console.log('hey')
        axios.post('https://blackjackmint.herokuapp.com/post/login', values)    
        .then((res) => {
        console.log(res.data)
            if(Object.keys(res.data).length > 0){
                setLoggedInUserContext(true)
                console.log(loggedInUserContext)
            }
        })
    }


if(loggedInUserContext){
    
    return(
            
        <Redirect to='/table' />

    )

} else{

    return (
        <div style={styles.landing} >
            <nav style={styles.nav}>
                <Link to='/'>
                        <h1 className='headerLink'>MintJack</h1>
                </Link>
            </nav>
            <div style={styles.hero}>
                <form
                    onSubmit={handleSubmitFile}
                    style={styles.form}
                >
                    <div style={styles.marginTop}>
                        <FormField
                                for='email'
                                label='Email'
                                inputClass=''
                                inputType='email'
                                inputId='email'
                                inputName='email'
                                value={values.email}
                                onChange={(e) => updateValue(e)}
                                
                            />
                    </div>
                    <div style={styles.marginTop}>
                        <FormField
                            for='password'
                            label='Password'
                            inputClass=''
                            inputType='password'
                            inputId='password'
                            inputName='password'
                            value={values.password}
                            onChange={(e) => updateValue(e)}
                            style={styles.marginTop}
                        />
                    </div>
                    <div style={styles.marginTop}>
                        <button type='submit' className='navBtns'>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>  
        )
}

}

export default Login