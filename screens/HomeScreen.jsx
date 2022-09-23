import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, View, Text, FlatList, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'

import { Container } from '../styles/mainStyle'

const posts = [
  {
    id: 1, 
    admin: 'John Doe', 
    src: require('../assets/members/ponyo001.jpg'), 
    postTime: '5분 전', 
    post: '00골프장에서 골프치실 분~',
    pdate: '2022.12.10 10시 - 16시',
    liked: 6,
    likes: 3,
    members: '철수, 영희, 순이'
  },
  {
    id: 2, 
    admin: 'D', 
    src: require('../assets/members/ponyo002.jpg'), 
    postTime: '15분 전', 
    post: '00골프장에서 골프치실?',
    pdate: '2022.12.10 10시 - 16시',
    liked: 6,
    likes: 3,
    members: '철, 영, 순'
  },
  {
    id:3, 
    admin: 'Joe', 
    src: require('../assets/members/ponyo003.jpg'), 
    postTime: '5분 전', 
    post: '00골프장에서 골프치실 분~',
    pdate: '2022.12.10 10시 - 16시',
    liked: 6,
    likes: 3,
    members: '수, 희, 이'
  },
  {
    id: 4, 
    admin: 'Joho', 
    src: require('../assets/members/ponyo004.jpg'), 
    postTime: '24분 전', 
    post: '00골프장 골프',
    pdate: '2022.12.10 10시 - 16시',
    liked: 6,
    likes: 3,
    members: '철수, 영희, 순이'
  },
  {
    id: 5, 
    admin: 'no', 
    src: require('../assets/members/ponyo005.jpg'), 
    postTime: '5분 전', 
    post: '00골프장에서 골프치실 분~',
    pdate: '2022.12.10 10시 - 16시',
    liked: 6,
    likes: 3,
    members: '철수, 영희, 순이'
  }
]

const ListHeader = () => {
  return null;
}

const HomeScreen = () => {

  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const fetchPosts = async () => {
    try{
      const list = [];
      await firestore().collection('posts')
                       .orderBy('postTime', 'desk')
                       .get()
                       .then((querySnapShot)=>{
                        console.log('Total Posts: ', querySnapShot.size)
                       })
    }catch(e){
      console.log(e)
    }
  }

  return (
    <SafeAreaView style={{flex:1}}>
      {/* { loading ? (
        <ScrollView style={{flex:1}}
                    contentContainerStyle={{alignItems:'center'}}
        >
          <SkeletonPlaceholder>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <View style={{width:60, height:60, borderRadius: 25}} />
              <View style={{marginLeft:20}}>
                <View style={{width:120, height:20,borderRadius:4}} />
                <View style={{marginTop:6, width:80, height:20, borderRadius:4}} />
              </View>
            </View>
            <View style={{marginTop:10, marginBottom:30}}>
              <View style={{width:300, height:20, borderRadius:4}} />
              <View style={{marginTop:6, width:250, height:20, borderRadius:4}} />
              <View style={{marginTop:6, width:350, height:200, borderRadius:4}} />
            </View>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <View style={{width:60, height:60, borderRadius: 25}} />
              <View style={{marginLeft:20}}>
                <View style={{width:120, height:20,borderRadius:4}} />
                <View style={{marginTop:6, width:80, height:20, borderRadius:4}} />
              </View>
            </View>
            <View style={{marginTop:10, marginBottom:30}}>
              <View style={{width:300, height:20, borderRadius:4}} />
              <View style={{marginTop:6, width:250, height:20, borderRadius:4}} />
              <View style={{marginTop:6, width:350, height:200, borderRadius:4}} />
            </View>
          </SkeletonPlaceholder>
        </ScrollView>
        ) : (
          <Container>
            <FlatList
                data={posts}
                renderItem={({item})=>(
                  <View>
                    {item.admin}
                  </View>
                )}
                keyExtractor={({item})=>item.id}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={ListHeader}
                ListFooterComponent={ListHeader}
            />
          </Container>
        )
      } */}
    </SafeAreaView>
  )
}

export default HomeScreen