import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native'
import CardView from 'react-native-cardview'

const width = Dimensions.get('window').width-40;

const Card = ({course, address, membercount, mcount, money, sdate, edate}) => {
  
  const addr = address.split(' ');
  const spAddr = addr[0] + addr[1];
  const restNumber = parseInt(membercount) - parseInt(mcount);


  return (
    <CardView
        cardElevation={7}
        cardMaxElevation={7}
        cornerRadius={15}
        style={sty.card}
    >  
        <View style={sty.container}>
          <View>
            <Text style={sty.title}>{course}</Text>
            <Text style={sty.sub}>{spAddr} | 남은 인원 ({restNumber}명)</Text>
          </View>
          <View>
            <Text style={sty.new}>NEW</Text>
          </View>
        </View>
        <View style={sty.footer}>
          <Text style={sty.money}>{money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 ~ </Text>
          <TouchableOpacity>
            <Text style={sty.buttonText}>{sdate.substring(8,10)}일 더보기</Text>
          </TouchableOpacity>
        </View>
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
  new:{
    backgroundColor:'#ef6464',
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
    color:'#1E90FF',
    // color:'#81C25F'
  },
  buttonText:{
    fontSize:16,
    fontWeight:'bold'
  }
})