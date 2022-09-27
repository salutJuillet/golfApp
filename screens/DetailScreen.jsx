import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, {useState, useEffect} from 'react'
import CalendarStrip from 'react-native-calendar-strip'

import Card from '../component/Card'

import {data} from '../tempDB/data'

const width = Dimensions.get('window').width;

const DetailScreen = ({navigation, route}) => {
 
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const {actdate} = route.params;

  const selectedDate = (date) => {
    const rdate = date.format('YYYY-MM-DD');
    setLoading(false);
    const lists = data.filter( x => x.sdate.substring(0,10) === rdate);
    setDatas(lists);
  }

  const allDatas = () => {
    setLoading(true);
    setDatas(data);
  }

  useEffect(()=>{
    if(loading){
        if(actdate){
          const lists = data.filter( x => x.sdate.substring(0,10) === actdate);
          setDatas(lists);
        }else{
          setDatas(data);
        }
    }
  },[]);

  const vLists = ({item}) => (
    <View 
        style={{justifyContent:'center', alignItems:'center'}}>
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
      <View>
        <CalendarStrip
          style={{
            height:100,
            paddingBottom:10,
            paddingTop:10,
            backgroundColor:'#ffffff'
          }}
          dateNumberStyle={{color:'grey'}}
          dateNameStyle={{color:'grey', paddingTop:10}}
          highlightDateContainerStyle={{color:'#000', backgroundColor:'#B7E49F'}}
          highlightDateNameStyle={{color:'#000', fontWeight:'bold'}}
          highlightDateNumberStyle={{color:'#000', fontWeight:'bold'}}
          iconContainer={{flex:0.1}}
          onDateSelected={selectedDate}
        />
      </View>

      <View 
        style={{
          width:'100%',
          paddingHorizontal:20, 
          paddingBottom:15,
          alignItems:'flex-end',
          marginTop:15,
          marginBottom:-10
        }}
      >
        <TouchableOpacity 
          onPress={allDatas}
          style={{
            paddingVertical:5,
            paddingHorizontal:7, 
            backgroundColor:'#fff',
            borderWidth:2,
            borderColor:'#B7E49F',
            borderRadius:8
          }}
        >
          <Text>전체보기</Text>
        </TouchableOpacity>
      </View>

      <View style={{flex:1}}>
        <FlatList
          data={datas}
          key={item => item.id}
          renderItem={vLists}
          style={{width}}
        />
      </View>
    </SafeAreaView>
  )
}

export default DetailScreen

const styles = StyleSheet.create({})