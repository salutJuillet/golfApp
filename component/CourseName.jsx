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

const CourseName = ({course}) => {
  return (
    <>
    <Picker
        data={course}
        renderItem={renderItem}
        itemWidth={itemWidth}
        initialIndex={0}
        onChange={item=>console.log(item)}
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