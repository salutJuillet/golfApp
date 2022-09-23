import React, { createContext, useState } from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

// import { GoogleSignin } from '@react-native-community/google-signin'
// import {LoginManager, AccessToken} from 'react-native-fb-sdk'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null);

  /* 로그인 */
  const signin = async (email, password) => {
    try{
        await auth().signInWithEmailAndPassword(email, password);
    }catch(err){
        console.log(err);
    }
  }
  /* 구글 로그인 */
//   const googleLogin = async () => {
//     try{
//         const {idToken} = await googleSignin.signIn();
//         const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//         await auth().signInWithCredential(googleCredential);
//     }catch(err){
    
//     }
//   }

  /* 로그아웃 */
  const logout = async () => {
    try{
        await auth().signOut();
    }catch(err){
        console.log(err);
    }
  }

  /* 회원가입 */
  const signup = async (email, password) => {
    try{
        await auth().createUserWithEmailAndPassword(email, password)
                    .then(()=>{
                        firestore().collection('members').doc(auth().currentUser.uid)
                        .set({
                            fname: '',
                            gender: '',
                            age: 20,
                            average: 99,
                            email: email,
                            tel: '',
                            createAt: firestore.Timestamp.fromDate(new Date()),
                            userImg: null
                        })
                        .catch(error => console.log('데이터 저장 중 에러 발생 ', error))
                    })
    }catch(err){
        console.log(err)
    }
  }

  return (
    <AuthContext.Provider value={{user, setUser, signin, signup, logout}}>
        {children}
    </AuthContext.Provider>
  )
}