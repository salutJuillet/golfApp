import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, {useEffect} from 'react'
import Picker from 'react-native-picker-horizontal'

const width = Dimensions.get('window').width;
const itemWidth = 120;

const renderItem = (item) => {
    return (
        <View style={{paddingVertical:5, lineHeight:33,}}>
            <Text style={sty.itemText}>{item.coursename}</Text>
        </View>
    )
}

const CourseName = ({course, insertData, setInsertData}) => {

  const handleInsert = (i) => {
    const zipcode = course[i].zipcode02 ? course[i].zipcode02 : course[i].zipcode01;
    const address = course[i].address02 ? course[i].address02 : course[i].address01;
    setInsertData({
        ...insertData, 
        zipcode, 
        address, 
        course: course[i].coursename, 
        tel:course[i].tel
    });
  }

  return (
    <>
    <Picker
        data={course}
        renderItem={renderItem}
        itemWidth={itemWidth}
        initialIndex={0}
        onChange={item=>console.log(item)} //item은 course의 배열 index로 들어온다.
        style={{marginLeft:30}}
    />
    </>
  )
}

export default CourseName

const sty = StyleSheet.create({
    itemText:{
        fontSize:10,
        fontWeight:'bold',
    },
})