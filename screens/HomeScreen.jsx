import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, ScrollView, View, Text, Dimensions, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'

import {data} from '../tempDB/data'
import CarouselCourse from '../component/CarouselCourse'
import Card from '../component/Card'
import { FlatList } from 'react-native-gesture-handler'

const width = Dimensions.get('window').width;

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

const HomeScreen = ({navigation}) => {

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(()=>{
    setDatas(data);
  },[]);

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

  const vLists = ({item}) => (
    <View style={{justifyContent:'center', alignItems:'center'}}>
      <Card
        course={item.course}
        address={item.address}
        membercount={item.membercount}
        mcount={item.mcount}
        money={item.money}
        sdate={item.sdate}
        edate={item.edate}

        mastername={item.mastername}
        member={item.member}
        mchar={item.mchar}
        
        navigation={navigation}
      />
    </View>
  )


  return (
    <SafeAreaView style={{flex:1}}>
      { loading ? (
        <ScrollView style={{flex:1}}
                    contentContainerStyle={{alignItems:'center'}}
                    showsVerticalScrollIndicator={false}
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
          <View style={{
              flex:1,
              alignItems: 'center',
              backgroundColor: '#f2f2f2'
            }}
          >
            <CarouselCourse />
            <View 
              style={{
                width:'100%',
                paddingHorizontal:20, 
                paddingBottom:15,
                alignItems:'flex-end'
              }}
            >
              <TouchableOpacity 
                onPress={()=>navigation.navigate('Detail', {actdate:''})}
                style={{
                  paddingVertical:5,
                  paddingHorizontal:7, 
                  backgroundColor:'#fff',
                  borderWidth:2,
                  borderColor:'#B7E49F',
                  borderRadius:8,
                  marginTop:-20,
                  marginBottom:-5
                }}
              >
                <Text>날짜별보기</Text>
              </TouchableOpacity>
            </View>
            <View>
              <FlatList
                data={datas}
                key={item => item.id}
                renderItem={vLists}
                style={{width}}
              />
            </View>
          </View>
        )
      }
    </SafeAreaView>
  )
}

export default HomeScreen