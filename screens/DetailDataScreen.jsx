import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native'
import React from 'react'

const width = Dimensions.get('window').width;

const DetailDataScreen = ({route}) => {

  const {
    course,
    address,
    membercount, 
    mcount, 
    money, 
    sdate, 
    edate,
    mastername,
    member,
    mchar,
    dday,
    bgColor
  } = route.params;


  return (
    <ScrollView style={sty.container}>
        <View style={{alignItems:'center', justifyContent:'center', paddingTop:20}}>
            <View style={sty.courseInfoContainer}>
                <Image 
                    source={{uri:'https://firebasestorage.googleapis.com/v0/b/my-app-12524.appspot.com/o/members%2Fcourse02.jpg?alt=media&token=67562a6b-bc25-42f2-9c6c-6caf7ef97ca1'}}
                    style={sty.courseImage}    
                />
                <View style={sty.infoContainer}>
                    <View>
                    <Text style={sty.title}>{course}</Text>
                    <Text style={sty.sub}>{address}</Text>
                    </View>
                    <View>
                    <Text style={[sty.dday, {backgroundColor: bgColor,}]}>D-{dday === 0 ? 'DAY' : dday}</Text>
                    </View>
                </View>
                <View style={sty.footer}>
                    <Text style={sty.money}>{money}원 ~ </Text>
                    <Text style={{fontSize:16}}>남은 인원 {membercount-mcount}명</Text>
                </View>
            </View>

            <View style={sty.conditionContainer}>
                <Text>시작일: {sdate}</Text>
                <Text>끝일: {edate}</Text>
                <Text>총인원: {membercount}</Text>
                {/* <Text>모집된 인원: {mcount}</Text> */}
                <Text>현재 멤버: {member.join(', ')}</Text>
                <Text>모임장: {mastername}</Text>
                <Text>{mchar === 'b' ? '남여 모두 가능' : mchar === 'f' ? '여성만' : '남성만'}</Text>
            </View>
        </View>
    </ScrollView>
  )
}

export default DetailDataScreen

const sty = StyleSheet.create({
    container:{
        flex:1,
    },
    courseInfoContainer:{
        backgroundColor:'#fff',
        borderRadius:8,
        elevation:7,
        overflow:'hidden',
        width: width - 40,
        padding:20,
        marginBottom:20
    },
    courseImage:{
        width:'100%',
        objectFit:'cover'
    },
    conditionContainer:{
        backgroundColor:'#fff',
        borderRadius:8,
        elevation:7,
        overflow:'hidden',
        width: width - 40,
        padding:20,
        marginBottom:20
    },
    infoContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        marginBottom:10,
        paddingBottom:10
    },
    title:{
        fontSize:25,
        fontWeight:'bold',
        color:'#000',
        marginBottom:8
    },
    sub:{
        fontSize:16,
        fontWeight:'600'
    },
    dday:{
        color:'#fff',
        paddingHorizontal:10,
        paddingVertical:3,
        borderRadius:8,
        marginTop:-30
    },
    footer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    money:{
        fontSize:20,
        fontWeight:'bold',
        color:'#81C25F'
    },
})