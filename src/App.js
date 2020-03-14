import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css';

import HomePage from '../src/pages/homepage/homepage.component'
import ShopPage from '../src/components/shop/shop.component'
import SignInAndSignUp from '../src/pages/sign-in-and-sign-up/sign-in-and-sign-up'
import Header from '../src/components/header/header.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions'
import SignInAndSignUpPage from '../src/pages/sign-in-and-sign-up/sign-in-and-sign-up';


const App = (props) => {
  //const [currentUser, setCurrentUser] = useState(null)
  
  useEffect(() => {
    let unsubscribeFromAuth = null
    const getUser = () => {
      unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
        if(userAuth){
          const userRef = await createUserProfileDocument(userAuth)

          userRef.onSnapshot(snapshot => {
            props.setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
            })
          })
        }

        props.setCurrentUser(userAuth)
      })
    } 

    getUser()

    return function cleanup(){
      unsubscribeFromAuth()
    }
  }, [])
  
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route 
          exact path="/signIn" 
          render={() => props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)}
        />
      </Switch>
    </div>
  );
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
