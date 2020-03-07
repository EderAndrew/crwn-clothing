import React, {useState} from 'react'
import './sign-in.styles.scss'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.components'

const SignIn = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleSubmit = event => {
        event.preventDefault()

        setEmail('')
        setPassword('')
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
               
                <CustomButton type='submit' value='submit form'>Sign In</CustomButton>
            </form>
        </div>
    )
}

export default SignIn