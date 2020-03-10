import React, {useState} from 'react'
import './sign-in.styles.scss'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.components'

import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

const SignIn = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleSubmit = async event => {
        event.preventDefault()

        try{
            await auth.signInWithEmailAndPassword(email, password)
            setEmail('')
            setPassword('')
        }catch(error){
            console.log(error)
        }
        
    }

    return(
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                  name='email'
                  type='email'
                  value={email}
                  handleChange={event => setEmail(event.target.value)}
                  label='email'
                  required
                />
                <FormInput
                  name='password'
                  type='password'
                  value={password}
                  handleChange={event => setPassword(event.target.value)}
                  label='password'
                  required
                />
                <div className='buttons'>
                    <CustomButton type='submit' value='submit form'>Sign In</CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign in with Google</CustomButton>
                </div>
            </form>
        </div>
    )
}

export default SignIn