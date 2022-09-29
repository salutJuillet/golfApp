import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, {useEffect} from 'react'
import Picker from 'react-native-picker-horizontal'

const ZONES = [
    '서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기도', '강원도', '충청북도', '충청남도', '경상북도', '경상남도', '전라북도', '전라남도', '제주'
]

const width = Dimensions.get('window').width;
const itemWidth = 60;

const renderItem = (item, index) => (
  <TouchableOpacity style={{width: itemWidth, paddingVertical:5}}>
    <Text style={sty.itemText}>{item}</Text>
  </TouchableOpacity>
)



const LocalName = ({getCourse, navigation}) => {

  const selectedCity = (v) => {
      // console.log(ZONES[v]);
      getCourse(ZONES[v]);
  }

  useEffect(()=>{
    getCourse('서울');
  }, [navigation]);

  return (
    <>
        <Picker 
            data={ZONES}
            renderItem={renderItem}
            itemWidth={itemWidth}
            initialIndex={0}
            onChange={newValue => selectedCity(newValue)}
            style={{flex:1, marginLeft:-5}}
        />
    </>
  )
}

export default LocalName

const sty = StyleSheet.create({
    itemText:{
        fontSize:14,
        fontWeight:'bold',
        textAlign:'center'
    },
})