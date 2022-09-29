import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useContext, useEffect} from 'react'
import { AuthContext } from '../context/AuthProvider'
import CardView from 'react-native-cardview'
import AntDesign from 'react-native-vector-icons/AntDesign'

import {db} from '../component/OpenDb'
import LocalName from '../component/LocalName'
import CourseName from '../component/CourseName'
import StartTimePicker from '../component/StartTimePicker'
import EndTimePicker from '../component/EndTimePicker'
import Calendars from '../component/Calendars'
import { FormInput } from '../component/FormInput'


const width = Dimensions.get('window').width;


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
    mcount: '1',
    member: [user.uid]
  });
  const [course, setCourse] = useState([]);
  const [newCourse, setNewCourse] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [buttonColor, setButtonColor] = useState(['#B7E49F', '#B7E49F', '#B7E49F']);

  const handleMcount = (e, operator) => {
    let newMcount;
    switch(operator) {
      case 'minus':
        newMcount = e.target.value - 1;
        if(newMcount < 1) newMcount = 1;
        setInsertData({...insertData, mcount: newMcount.toString()});
        return;
      case 'plus':
        newMcount = e.target.value + 1;
        setInsertData({...insertData, mcount: newMcount.toString()});
        return;
    }
  }

  const selectGender = (e) => {
    let colors = [];
    if(e===1){
       colors = ['#B7E49F', '#81C25F', '#B7E49F'];
       setInsertData({...insertData, mchar:'f'});
    }else if(e===2){
       colors = ['#B7E49F', '#B7E49F', '#81C25F'];
       setInsertData({...insertData, mchar:'m'});
    }else{
       colors = ['#81C25F', '#B7E49F', '#B7E49F'];
       setInsertData({...insertData, mchar:'b'});
    }
    setButtonColor(colors)
  }

  const handleCourse = () => {
    setInsertData({...insertData, 
      course: newCourse.coursename,
      address: newCourse.address01 ? newCourse.address01 : newCourse.address02,
      zipcode: newCourse.zipcode01 ? newCourse.zipcode01 : newCourse.zipcode02,
    })
  } 

  const getCourse = (zone) => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM golfcourse WHERE (address01 LIKE '${zone}%' OR address02 LIKE '${zone}%')`, [], (sqlTxn, res)=>{ //찾은 것들을, []배열에 담아서, callback
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


  const viewCourse = ({item}) => {
    return (
      <CardView
          cardElevation={7}
          cardMaxElevation={7}
          cornerRadius={15}
          style={sty.card}
      >  
        <TouchableOpacity onPress={()=>{setNewCourse({...item}); handleCourse();}}>
          <View style={sty.cardContainer}>
            <View>
              <Text style={sty.title}>{item.coursename}</Text>
              {/* <Text style={sty.sub}>
                { 
                  !item.zipcode01 && !item.zipcode02 
                  ? '' 
                  : item.zipcode01 
                    ? '(' + item.zipcode01 + ')'
                    : '(' + item.zipcode02 + ')'
                }
              </Text> */}
              <Text style={sty.sub}>
                {item.address02 ? item.address02 : item.address01}
              </Text>
            </View>
          </View>
        </TouchableOpacity> 
      </CardView>
    )
  }


  return (
    <SafeAreaView style={sty.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex:1}}>
        {/* <View style={{position:'absolute', zIndex:5}}> */}
          <View style={[sty.formGroup, sty.borderBottomDashed]}>
            <Text style={sty.label}>지역선택</Text>
            <LocalName getCourse={getCourse} />
          </View>

          {/* <View style={sty.formGroup}>
            <Text style={sty.label}>코스선택</Text>
            <CourseName course={course} />
          </View> */}

          {/* 시작일시선택 */}
          <View style={[sty.formGroup, sty.borderBottomDashed]}>
            <Text style={sty.label}>시작일시</Text>
            <StartTimePicker />
          </View>

          {/* 마침일시선택 */}
          <View style={[sty.formGroup, sty.borderBottomDashed]}>
            <Text style={sty.label}>마침일시</Text>
            <EndTimePicker />
          </View>

          {/* 인원선택 */}
          <View style={[sty.formGroup, sty.borderBottomDashed]}>
            <Text style={sty.label}>최대 인원수</Text>
            <View style={{flexDirection:'row', flex:1, justifyContent:'center', alignItems:'center'}}>
              <TouchableOpacity onPress={e=>handleMcount('minus',e)}>
                <AntDesign name='minus' size={20} color='#666' />
              </TouchableOpacity>
              <TextInput 
                type='text' 
                value={insertData.mcount} 
                // onChange={onChangeMcount}
                keyboardType='number-pad'
                style={{backgroundColor:'#fff',borderRadius:5, textAlign:'center', marginHorizontal:5}} />
              <TouchableOpacity onPress={e=>handleMcount('plus', e)}>
                <AntDesign name='plus' size={20} color='#666' />
              </TouchableOpacity>
            </View>
          </View>

          {/* 성별선택 */}
          <View style={[sty.formGroup, sty.borderBottomDashed]}>
            <Text style={sty.label}>성별</Text>
            <View style={{flexDirection:'row', flex:1, justifyContent:'center'}}>
              <TouchableOpacity
                onPress={()=>selectGender(0)}
                style={[sty.genderButton, {backgroundColor: buttonColor[0]}]}
              >
                <Text style={sty.genderButtonText}>제한없음</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>selectGender(1)}
                style={[sty.genderButton, {backgroundColor: buttonColor[1], marginHorizontal:5}]}
              >
                <Text style={sty.genderButtonText}>여성만</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>selectGender(2)}
                style={[sty.genderButton, {backgroundColor: buttonColor[2]}]}
              >
                <Text style={sty.genderButtonText}>남성만</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 금액입력 */}
          <View style={sty.formGroup}>
            <Text style={sty.label}>금액</Text>
            <View style={sty.moneyInputContainer}>
              <View>
                <AntDesign 
                    name='creditcard'
                    size={22} 
                    color='#999'
                />
              </View>
              <TextInput 
                  value={insertData.money}
                  numberOfLines={1}
                  keyboardType='numeric'
                  style={sty.moneyInput}
              />
              <Text>원</Text>
            </View>
          </View>
        {/* </View> */}

        {/* 선택된 골프장 리스트 출력 */}
        <View style={{alignItems:'center', paddingTop:20}}>
          <FlatList
              data={course}
              renderItem={viewCourse}
              keyExtractor={item=>item.id}  
          />
        </View>
      </View>
      </TouchableWithoutFeedback>
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
  formGroup:{
    width, 
    paddingVertical:10, 
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#ededed',
    position:'relative',
  },
  borderBottomDashed:{
    borderBottomWidth:1,
    borderBottomColor:'#999',
    borderStyle:'dashed',
  },
  label:{
    width:100,
    lineHeight:33,
    fontSize:16,
    fontWight:'bold',
    borderRightWidth:1,
    borderRightColor:'#999',
    marginRight:5,
    zIndex:10,
    backgroundColor:'#ededed',
    textAlign:'center'
  },
  genderButton:{
    paddingVertical:4,
    paddingHorizontal:7,
    borderRadius:5,
    elevation:1
  },
  genderButtonText:{
    fontWeight:'bold',
    color:'#666'
  },
  moneyInputContainer:{
    backgroundColor:'#fff',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:10,
    flex:1,
    borderRadius:5,
    marginRight:10,
    marginLeft:5
  },
  moneyInput:{
    lineHeight:28,
    width:'85%',
    textAlign:'right'
  },

  card:{
    backgroundColor:'#ffffff',
    width: width - 40,
    padding:20,
    marginHorizontal:20,
    marginBottom:20,
  },
  cardContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingBottom:10,
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
})