import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect, useContext} from 'react'

import { AuthContext } from '../context/AuthProvider'
import firestore from '@react-native-firebase/firestore'

import {FormButton} from '../component/FormButton'

const ProfileScreen = ({navigation, route}) => {

  const { user, logout} = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [userData, setUserData] = useState(null);

  const fetchPost = async () => {
    try{ 
      await firestore().collection('members')
                       .where('userId', '==', route.params ? route.params.userId : user.Id)
                       .get()
                       .then((querySnapshot) => {
                          console.log('Posts: ', querySnapshot)
                       })

    }catch(e){
      console.log(e);
    }
  }

  /* 회원정보 가져오기 */
  const getUser = async () => {
    await firestore().collection('members')
                     .doc(route.params ? route.params.email : user.uid)
                     .get()
                     .then((res) => {
                      //  console.log(res.data());
                      const mem = res.data();
                      if(mem.fname === '') {
                        Alert.alert('아직 회원정보를 입력하지 않으셨습니다.\n회원정보를 입력해주세요.');
                        navigation.navigate('EditProfile');
                        return;
                      }else{

                      }
                     })
  }

  useEffect(()=>{
    getUser();
  }, [navigation, loading])

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
      <ScrollView>
        <Text>
          유저 { userData }
        </Text>
        <FormButton 
            buttonTitle='로그아웃'
            backgroundColor='#B7E49F'
            onPress={logout} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen

const sty = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    padding:20
  },
  userImg:{
    height:180,
    width:180,
    borderRadius:90
  }
})