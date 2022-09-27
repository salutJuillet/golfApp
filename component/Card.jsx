import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Dimensions } from 'react-native'
import CardView from 'react-native-cardview'
import moment from 'moment'

const width = Dimensions.get('window').width-40;

const Card = ({navigation, course, address, membercount, mcount, money, sdate, edate, mastername, member, mchar}) => {

  const [dday, setDday] = useState(100); 
  
  const addr = address.split(' ');
  const spAddr = addr[0] + ' ' + addr[1];
  const now = moment().format('YYYY-MM-DD');
  const actDate = sdate.substring(0, 10);
  const restNumber = parseInt(membercount) - parseInt(mcount);

  const betweenDay = (fDate, sDate) => {
    let fDateObj = new Date(fDate.substring(0,4), fDate.substring(5,7)-1, fDate.substring(8,10));
    let sDateObj = new Date(sDate.substring(0,4), sDate.substring(5,7)-1, sDate.substring(8,10));
    const betweenTime = Math.abs(sDateObj.getTime() - fDateObj.getTime());
    return Math.floor(betweenTime / (1000 * 60 * 60 * 24));
  }

  useEffect(()=>{
    setDday(betweenDay(now, actDate));
  }, []);

  let bgColor = dday < 3 ? '#ef6464' : '#00acee';


  return (
    <CardView
        cardElevation={7}
        cardMaxElevation={7}
        cornerRadius={15}
        style={sty.card}
    >  
        <TouchableOpacity
            onPress={()=>navigation.navigate('DetailData', {
              course,
              address,
              membercount, 
              mcount, 
              money: money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), 
              sdate, 
              edate,
              mastername,
              member,
              mchar,
              dday,
              bgColor
            })}
        >
          <View style={sty.container}>
            <View>
              <Text style={sty.title}>{course}</Text>
              <Text style={sty.sub}>{spAddr} | 남은 인원 ({restNumber}명)</Text>
            </View>
            <View>
              <Text style={[sty.dday, {backgroundColor: bgColor,}]}>D-{dday === 0 ? 'DAY' : dday}</Text>
            </View>
          </View>
          <View style={sty.footer}>
            <Text style={sty.money}>{money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 ~ </Text>
          </View>
        </TouchableOpacity>
    </CardView>
  )
}

export default Card

const sty = StyleSheet.create({
  card:{
    backgroundColor:'#ffffff',
    width,
    marginVertical:10,
    padding:20,
  },
  container:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderBottomWidth:1,
    borderBottomColor:'#ddd',
    paddingBottom:10,
    marginBottom:10
  },
  title:{
    fontSize:25,
    fontWeight:'bold',
    color:'#000',
    marginBottom:8
  },
  sub:{
    fontSize:14,
    fontWeight:'600'
  },
  dday:{
    color:'#fff',
    paddingHorizontal:10,
    paddingVertical:3,
    borderRadius:8,
    marginTop:-27
  },
  footer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  money:{
    fontSize:20,
    fontWeight:'bold',
    // color:'#81C25F',
    color:'#81C25F'
  },
  buttonText:{
    fontSize:16,
    fontWeight:'bold'
  }
})