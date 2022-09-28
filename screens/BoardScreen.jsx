import { StyleSheet, Text, View, ScrollView, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useContext} from 'react'
import { openDatabase } from 'react-native-sqlite-storage'
import Picker from 'react-native-picker-horizontal'
import { AuthContext } from '../context/AuthProvider'
import CardView from 'react-native-cardview'

import Calendars from '../component/Calendars'

const width = Dimensions.get('window').width;

const db = openDatabase({
  name: 'golfcourse.db',
  location: 'default',
  createFromLocation: '~www/golfcourse.db'
}, (DB)=>{
  console.log('접속 성공');
}, (error)=>{
  console.log('에러 ', error.message);
})

const ZONES = [
  '서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기', '강원', '충청북도', '충청남도', '경상북도', '경상남도', '전라북도', '전라남도', '제주'
]


const itemWidth = 80;
const renderItem = (item, index) => (
  <TouchableOpacity style={[sty.item, {width: itemWidth}]}>
    <Text style={sty.itemText}>{item}</Text>
  </TouchableOpacity>
)


const BoardScreen = ({navigation}) => {

  const {user} = useContext(AuthContext);
  const [insertData, setInsertData] = useState({
    sdate:'',
    edate:'',
    mastername: user.fname,
    masteremail: user.email,
    zipcode: '',
    course: '',
    address: '',
    money: '',
    membercount: '',
    mchar: 'b',
    mcount: '',
    member: [user.udi]
  });
  const [course, setCourse] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');


  const getCourse = (zone) => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM golfcourse WHERE (address01 LIKE '${zone}%' OR address02 LIKE '${zone}%')`, [], (sqlTnx, res)=>{ //찾은 것들을, []배열에 담아서, callback
          let len = res.rows.length;
          // console.log('총 '+ len + '개의 데이터를 확인했습니다.');
          if(len > 0) {
            let results = [];
            for(let i=0; i<len; i++){
              let item = res.rows.item(i);
              results.push({
                id: item.id,
                tel: item.tel,
                zipcode01: item.zipcode01,
                address01: item.address01,
                address02: item.address02,
                zipcode02: item.zipcode02,
                coursename: item.course_name,
                x: item.x,
                y: item.y
              });
            }
            setCourse(results);
          }else{
            setCourse([]);
          }
        },
        error => {
          console.log('error: ', error.message);
        }
      )
    })
  }

  const selectedCity = (v) => {
    // console.log(ZONES[v]);
    getCourse(ZONES[v]);
  }

  const viewCourse = ({item}) => (
    <CardView
        cardElevation={7}
        cardMaxElevation={7}
        cornerRadius={15}
        style={sty.card}
    >  
      <TouchableOpacity>
        <View style={sty.cardContainer}>
          <View>
            <Text style={sty.title}>{item.coursename}</Text>
            <Text style={sty.sub}>
              { 
                !item.zipcode01 && !item.zipcode02 
                ? '' 
                : item.zipcode01 
                  ? '(' + item.zipcode01 + ')'
                  : '(' + item.zipcode02 + ')'
              }
            </Text>
            <Text style={sty.sub}>
              {item.address02 ? item.address02 : item.address01}
            </Text>
          </View>
        </View>
        <View style={sty.footer}>
          <Text style={sty.money}>원 ~ </Text>
        </View>
      </TouchableOpacity> 
    </CardView>
  )

  console.log(insertData);
  return (
    <SafeAreaView style={sty.container}>
      <Text tsyle={sty.title}>골프그룹 개설</Text>
      <View style={{flex:1}}>
        <View style={sty.formGroup}>
          <Text style={sty.label}>지역선택</Text>
          <Picker 
              data={ZONES}
              renderItem={renderItem}
              itemWidth={itemWidth}
              initialIndex={3}
              onChange={newValue => selectedCity(newValue)}
          />
        </View>
        <View>
          <Calendars />
        </View>

        <View style={{alignItems:'center'}}>
          <FlatList
              data={course}
              renderItem={viewCourse}
              keyExtractor={item=>item.id}  
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BoardScreen

const sty = StyleSheet.create({
  container:{
    padding:10,
    flex:1,
    alignItems:'center'
  },
  title:{
    fontSize:20,
    fontWeight:'bold',
    marginBottom:20
  },
  item:{
    padding:5,
  },
  itemText:{
    fontSize:14,
    fontWeight:'bold'
  },
  label:{
    width:100,
    fontSize:18,
    fontWight:'bold',
    borderRightWidth:1,
    borderRightColor:'#999',
    marginRight:10
  },
  formGroup:{
    width, 
    marginBottom:10, 
    padding:10, 
    boderBottomWidth:1,
    borderBottomColor:'#999',
    borderStyle:'dashed',
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#B7E49F'
  },

  card:{
    backgroundColor:'#ffffff',
    width: width - 40,
    padding:20,
    marginHorizontal:20,
    marginBottom:20
  },
  cardContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderBottomWidth:1,
    borderBottomColor:'#ddd',
    paddingBottom:10,
    marginBottom:10,

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