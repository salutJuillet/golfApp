import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

const windowWidth = Dimensions.get('window').width;

const MESSAGES = [
  {
    id:1,
    username: '이름1',
    userImg: require('../assets/images/img_man01.png'),
    messageTime:'2022.09.23 16:17',
    messageText:'안녕하세요.',
    position: 'left'
  },
  {
    id:2,
    username: '이름2',
    userImg: require('../assets/images/img_man02.png'),
    messageTime:'2022.09.23 16:17',
    messageText:'안녕하세요.',
    position: 'left'
  },
  {
    id:3,
    username: '이름3',
    userImg: require('../assets/images/img_man03.png'),
    messageTime:'2022.09.23 16:18',
    messageText:'안녕하세요.',
    position: 'left'
  },
  {
    id:4,
    username: '이름4',
    userImg: require('../assets/images/img_man04.png'),
    messageTime:'2022.09.23 16:25',
    messageText:'안녕하세요.',
    position: 'rignt'
  },
]

const MessagesScreen = ({navigation}) => {
  return (
    // <ScrollView showsVerticalScrollIndicator={false}> FlatList도 스크롤이 있어서 중복 x
      <View style={sty.container}>
        <FlatList
          data={MESSAGES}
          keyExtractor={item => item.id}
          renderItem={({item})=>(
            <>
              <TouchableOpacity 
                  onPress={()=>navigation.navigate('Chat'), {username: item.username}} 
                  style={sty.messageContainer}
              >
                <View>
                  <Image source={item.userImg} style={sty.userImage} resizeMode='contain' />
                </View>
                <View style={sty.textContainer}>
                  <View style={{width:'60%'}}>
                    <Text style={{marginVertical:2, fontSize:16}}>{item.username}</Text>
                    <Text style={{fontSize:15}} numberOfLines={2}>{item.messageText}</Text>
                  </View>
                  <Text style={{color:'#aaa', width:'40%', textAlign:'right'}}>{item.messageTime}</Text>
                </View>
              </TouchableOpacity>
              <View style={{backgroundColor:'#ccc', height:1, marginVertical:5}} />
            </>
          )}
        />
      </View>
    // </ScrollView>
  )
}

export default MessagesScreen

const sty = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:20,
    paddingVertical:5
  },
  messageContainer:{
    flexDirection:'row',
    alignItems:'center',
    marginVertical:10
  },
  userImage:{
    width:60,
    height:60,
    borderRadius:30,
    backgroundColor:'#ffffff',
  },
  textContainer:{
    marginLeft:10, 
    flexDirection:'row', 
    justifyContent:'space-between',
    alignItems:'flex-start', 
    width: windowWidth - 40 - 60 -10 // -패딩 -이미지넓이 -marginLeft
  }
})