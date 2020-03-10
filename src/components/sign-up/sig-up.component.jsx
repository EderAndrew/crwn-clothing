import React, {useState} from 'react'
import './sig-up.styles.scss'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.components'

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'

const SignUp = () => {
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

        if(password !== confirmPassword){
            alert("Password don't match")
            return
        }

        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password)

            await createUserProfileDocument(user, { displayName })

            setDisplayName('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')

        }catch(error){
            console.error(error)
        }
    }

    return(
        <div className='sign-up'>
            <h2 className='title'>I do not have a account</h2>
            <span>Sign up with email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput
                  type='text'
                  name='displayName'
                  value={displayName}
                  onChange={event=>setDisplayName(event.target.value)}
                  label='Display Name'
                  required
                />
                <FormInput
                  type='email'
                  name='email'
                  value={email}
                  onChange={event=>setEmail(event.target.value)}
                  label='Email'
                  required
                />
                <FormInput
                  type='password'
                  name='password'
                  value={password}
                  onChange={event=>setPassword(event.target.value)}
                  label='password'
                  required
                />
                <FormInput
                  type='password'
                  name='confirmPassword'
                  value={confirmPassword}
                  onChange={event=>setConfirmPassword(event.target.value)}
                  label='Confirm Password'
                  required
                />
                <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
        </div>
    )
}

export default SignUp
