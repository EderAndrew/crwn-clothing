import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyDjyus1Uw10gfVdodo647qmApJ_rG759EE",
    authDomain: "crwn-db-963c8.firebaseapp.com",
    databaseURL: "https://crwn-db-963c8.firebaseio.com",
    projectId: "crwn-db-963c8",
    storageBucket: "crwn-db-963c8.appspot.com",
    messagingSenderId: "326162984426",
    appId: "1:326162984426:web:d4a23c9c42ae07af8fd693",
    measurementId: "G-KGEDHP558E"
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

//Google authentication
const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
