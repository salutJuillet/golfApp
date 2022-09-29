import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect, useContext} from 'react'

import { AuthContext } from '../context/AuthProvider'
import firestore from '@react-native-firebase/firestore'

import {FormButton} from '../component/FormButton'

const width = Dimensions.get('window').width;

const ProfileScreen = ({navigation, route}) => {

  const { user, logout} = useContext(AuthContext);
  let createTime;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [userData, setUserData] = useState({
    age:0,
    average:0,
    email: user.uid,
    fname:'',
    gender:false,
    tel:'',
    userImg: null
  });

  // const {age, average, email, fname, gender, tel, userImg} = userData;

  /* where절을 이용해 userData 가져오는 방법 */
  // const fetchPost = async () => {
  //   try{ 
  //     await firestore().collection('members')
  //                      .where('userId', '==', route.params ? route.params.userId : user.Id)
  //                      .get()
  //                      .then((querySnapshot) => {
  //                         console.log('Posts: ', querySnapshot.size)
  //                      })

  //   }catch(e){
  //     console.log(e);
  //   }
  // }

  /* 회원정보 가져오기 */
  const getUser = async () => {
    await firestore().collection('members')
                     .doc(route.params ? route.params.email : user.uid)
                     .get()
                     .then((res) => {
                       //  console.log(res.data());
                       if(res.exists){
                         setUserData(res.data());
                      }
                     })
  }

  if(userData){
    const tstamp = userData.createAt.seconds;
    let date = new Date(tstamp * 1000);
    createTime = `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
  }

  useEffect(()=>{
    getUser();
    navigation.addListener('focus', ()=>setLoading(!loading));
  }, [navigation])
  // console.log(userData);

  return (
    <SafeAreaView>
      <ScrollView style={{padding:20}} showsVerticalScrollIndicator={false}>
        { 
          userData.fname === '' ? (
            <FormButton 
              buttonTitle='프로필 수정' 
              backgroundColor='#B7E49F'
              onPress={()=>navigation.navigate('EditProfile')}
            />
          ) : (
            <View style={sty.container}>
              <Image source={{
                        uri: userData ? userData.userImg : 'https://firebasestorage.googleapis.com/v0/b/my-app-12524.appspot.com/o/members%2Fdefault_profile.jpg?alt=media&token=6d30819b-1924-4335-8a8a-a923f4c43fa8'
                     }}
                     style={sty.userImg} 
              />
              <View style={sty.userInfoContainer}>
                <View style={{flexDirection:'row', alignItems:'center', borderWidth:1}}>
                  <Image source={require('../assets/images/heels.png')}
                         style={sty.labelImage} />
                  <Text style={sty.userInfo}>이메일:  {userData && userData.email}</Text>
                </View>
                
                <Text style={sty.userInfo}>{userData && userData.age}</Text>
                <Text style={sty.userInfo}>{userData && userData.fname}</Text>
                <Text style={sty.userInfo}>{userData && userData.gender ? '남성' : '여성'}</Text>
                <Text style={sty.userInfo}>{userData && userData.average}</Text>
                <Text style={sty.userInfo}>{userData && userData.tel}</Text>
                <Text style={sty.userInfo}>{createTime}</Text>
              </View>
            </View>
          )
        }

        <FormButton
          buttonTitle='프로필 수정'
          backgroundColor='#B7E49F'
          onPress={()=>navigation.navigate('EditProfile')}
        />
        <FormButton
          buttonTitle='로그아웃'
          backgroundColor='#B7E49F'
          onPress={logout}
        />
        
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen

const sty = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  userImg:{
    height:180,
    width:180,
    borderRadius:90,
  },
  userInfoContainer:{
    marginVertical:30,
    alignItems:'flex-start',
    width: width - 40,
    backgroundColor:'#fff',
    borderRadius:8,
    paddingVertical:15,
    paddingHorizontal:10
  },
  labelImage:{
    width:30,
    height:16,
    // marginRight:5
  },
  userInfo:{
    fontSize:22,
  }
})