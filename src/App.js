import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';

import HomePage from '../src/pages/homepage/homepage.component'
import ShopPage from '../src/components/shop/shop.component'
import SignInAndSignUp from '../src/pages/sign-in-and-sign-up/sign-in-and-sign-up'
import Header from '../src/components/header/header.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'


const App = () => {
  const [currentUser, setCurrentUser] = useState(null)
  
  useEffect(() => {
    let unsubscribeFromAuth = null
    const getUser = () => {
      unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
        if(userAuth){
          const userRef = await createUserProfileDocument(userAuth)

          userRef.onSnapshot(snapshot => {
            setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
            })
          })
        }
        setCurrentUser(userAuth)
      })
    } 

    getUser()

    return function cleanup(){
      unsubscribeFromAuth()
    }
  }, [])
  
  useEffect(() => {
    console.log(currentUser)
  },[currentUser])
  
  return (
    <div>
      <Header currentUser={currentUser} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/signIn" component={SignInAndSignUp} />
      </Switch>
    </div>
  );
}

export default App;
