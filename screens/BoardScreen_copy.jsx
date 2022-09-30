import { StyleSheet, ScrollView, Text, View, SafeAreaView, Button, Dimensions } from 'react-native'
import React, {useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthProvider'
//import firestore from '@react-native-firebase/firestore'

import { db } from '../component/OpenDb';
import LocalName from '../component/LocalName';
import CourseName from '../component/CourseName';
import StartTimePicker from '../component/StartTimePicker';
import EndTimePicker from '../component/EndTimePicker';

import FormInput from '../component/FormInput'
import FormButton from '../component/FormButton';

const width = Dimensions.get('window').width;

const BoardScreen = ({ navigation }) => {

  const { user } = useContext(AuthContext);
  const [loading, setLoading ] = useState(true);
  const [ insertData, setInsertData ] = useState({
      sdate: '',
      edate: '',
      mastername: user.fname,
      masteremail: user.email,
      zipcode: '',
      course: '',
      address: '',
      tel:'',
      money: '',
      membercount: '',
      mchar: 'b', //f,m,b
      mcount: '',
      member: [user.uid]
  })
  const [course, setCourse] = useState([]);
  const [btColor, setBtColor] = useState(['#0c751e','','']);

  const [mcount, setMcount] = useState(0);
  const [sgender, setSgender] = useState('b');
  const [smoney, setSmoney] = useState(0);
  
  const getCourse = (zone) => {
        setLoading(false);
        db.transaction(txn => {
           txn.executeSql(
              `SELECT * 
               FROM golfcourse 
               WHERE 
               (address01 LIKE '${zone}%' or address02 LIKE '${zone}%')`,
              [],
              (sqlTnx, res) => {
                let len = res.rows.length;
                console.log('총'+len+'개의 데이터를 확인');
                if(len > 0) {
                   let results = [];
                   for(let i =0; i < len; i++) {
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
                 console.log('error :' + error.message);
              }
           )
        })  
  } 

  const selectedCity = (v) => {
     //console.log(zones[v]);
     getCourse(v);
  }

  const selectGender = (e) => {
     let colors = [];
     if(e===1){
        colors = ['', '#0c751e', ''];
        setSgender('f');
     }else if(e===2){
        colors = ['', '', '#0c751e'];
        setSgender('m');
     }else{
        colors = ['#0c751e', '', ''];
        setSgender('b');
     }
     setBtColor(colors);
  }

  useEffect(()=>{
    if(loading) {
       getCourse('서울');
    }   
  },[]);

  const handleUpdate = () => {
    setInsertData({
        ...insertData,
        money: smoney,
        membercount:mcount,
        mchar: sgender,
        mcount:0
    })
  }
// console.log(insertData); //CourseName.jsx의 데이터가 들어오는지 확인하기
   return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
      >
      <View style={{ flex: 1, marginTop: 20}}>
          {/* 지역선택 */}
          <View style={styles.formGroup}>
              <Text style={styles.label}>지역선택</Text>            
              <LocalName selectedCity={selectedCity} />
          </View>

          {/* 골프장선택 */}
          <View style={styles.formGroup}>
             <Text style={[styles.label, {height: 50}]}>코스선택</Text>    
             <CourseName course={ course } insertData={insertData} setInsertData={setInsertData} />
          </View>

          {/* 시작일시선택 */}
          <View style={styles.formGroup}>
             <Text style={[styles.label, {height: 50}]}>시작일선택</Text>    
             <StartTimePicker />
          </View>

          {/* 마침일시선택 */}
          <View style={styles.formGroup}>
             <Text style={[styles.label, {height: 50}]}>마침일선택</Text>    
             <EndTimePicker />
          </View>

          {/* 인원입력 */}
          <View style={styles.formGroup}>
             <Text style={[styles.label, {height: 50}]}>최대인원입력</Text>    
             <View style={{flex:1, paddingRight:30}}>
             <FormInput
                //labelValue={}
                placeholderText="인원입력"
                iconType="team"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                onChangeText={(e)=>setMcount(e)}
                 />
              </View>   
          </View>         

          {/* 성별선택 */}
          <View style={styles.formGroup}>
             <Text style={[styles.label, {height: 50}]}>성별선택</Text>    
             <View style={{flex:1, alignItems:'center', flexDirection: 'row', justifyContent:'space-evenly'}}>
                 <Button color={btColor[0]} title="상관없음" onPress={() => selectGender(0) }/>
                 <Button color={btColor[1]} title="여자" onPress={() => selectGender(1)} />
                 <Button color={btColor[2]} title="남자" onPress={() => selectGender(2)} />
             </View>
          </View>          

          {/* 금액입력 */}
          <View style={styles.formGroup}>
             <Text style={[styles.label, {height: 50}]}>금액입력</Text>    
             <View style={{flex:1, flexDirection:'row', alignItems:'center', paddingRight:50}}>
             <FormInput
                //labelValue={}
                placeholderText="금액입력"
                iconType="creditcard"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                onChangeText={(e)=>setSmoney(e)}
              /><Text style={{fontSize:18, marginLeft:5}}>원</Text>
              </View>
          </View>
          <View style={{ alignItems:'center', 
                         justifyContent:'center', 
                         paddingBottom:40, 
                         paddingTop:15,
                         paddingHorizontal:60 }}>
              <FormButton 
                 buttonTitle="등록"
                 backgroundColor="#0c751e"
                 color="#fff"
                 onPress={handleUpdate}
              />
          </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default BoardScreen

const styles = StyleSheet.create({
   container: {
      padding:10,
      flex: 1,
      alignItems:'center'
   },
   title: {
      fontSize:20,
      fontWeight: 'bold',
      marginBottom: 20
   },
   formGroup: {
      width, 
      marginBottom:15, 
      paddingBottom:10, 
      borderBottomWidth:1,
      borderBottomColor:'#999',
      borderStyle:'dashed',
      flexDirection:'row',
      position:'relative'
   },
   label:{
      width: 120,
      lineHeight: 33,
      fontSize:16,
      fontWeight: 'bold',
      borderRightWidth: 1,
      borderRightColor:'#999',
      marginRight:10,
      position: 'relative',
      zIndex: 10,
      paddingLeft:20,
      backgroundColor:'#ededed'
   },

})