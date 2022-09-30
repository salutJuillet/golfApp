import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { format } from 'date-fns'
// import ko from 'date-fns/esm/locale/ko'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

const EndTimePicker = ({insertData, setInsertData}) => {
  
  const [edDate, setEdDate] = useState(new Date());
  const [mode, setMode] = useState('date'); //팝업창 종류
  const [visible, setVisible] = useState(false);

  const onPressDate = () => {
    setMode('datetime');
    setVisible(true);
  } 

  const onConfirm = (selectedDate) => {
    setVisible(false);
    setEdDate(selectedDate);
    setInsertData({...insertData, edate: edDate});
  }
  
  const onCancel = () => {
    setVisible(false);
  }


  return (
    <View style={sty.container}>
        {
            !edDate ? (
                <View style={sty.buttonsContainer}>
                    <TouchableOpacity onPress={onPressDate}>
                        <Text>마침일시 선택</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity onPress={onPressDate}>
                    <Text style={sty.date}>{format(edDate, 'yyyy-MM-dd HH:mm')}</Text>
                </TouchableOpacity>
            )
        }
    
    <DateTimePickerModal
        isVisible={visible}
        mode={mode}
        onConfirm={onConfirm}
        onCancel={onCancel}
        date={edDate}
    />
    </View>
  )
}

export default EndTimePicker

const sty = StyleSheet.create({
    container:{
        zIndex:20,
        flex:1,
        alignItems:'center',
    },
    buttonsContainer:{
      backgroundColor:'#fff',
      alignItems:'center',
      paddingVertical:5,
      paddingHorizontal:10,
      borderRadius:5,
      elevation:1,
    },
    date:{
        color:'#666',
        fontSize:16,
        fontWeight:'bold',
        borderBottomWidth:1,
        borderStyle:'dashed'
    }
})