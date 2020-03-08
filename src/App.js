import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';

import HomePage from '../src/pages/homepage/homepage.component'
import ShopPage from '../src/components/shop/shop.component'
import SignInAndSignUp from '../src/pages/sign-in-and-sign-up/sign-in-and-sign-up'
import Header from '../src/components/header/header.component'
import { auth } from './firebase/firebase.utils'


const App = () => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })
  }, [currentUser])

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
