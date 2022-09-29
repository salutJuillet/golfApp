import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { format } from 'date-fns'
// import ko from 'date-fns/esm/locale/ko'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

const StartTimePicker = () => {
  
  const [stDate, setStDate] = useState(new Date());
  const [mode, setMode] = useState('date'); //팝업창 종류
  const [visible, setVisible] = useState(false);

  const onPressDate = () => {
    setMode('datetime');
    setVisible(true);
  } 

  const onConfirm = (selectedDate) => {
    setVisible(false);
    setStDate(selectedDate);
  }
  
  const onCancel = () => {
    setVisible(false);
  }


  return (
    <View style={sty.container}>
        {
            !stDate ? (
                <View style={sty.buttonsContainer}>
                    <TouchableOpacity onPress={onPressDate}>
                        <Text>시작일시 선택</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity onPress={onPressDate}>
                    <Text style={sty.date}>{format(stDate, 'yyyy-MM-dd HH:mm')}</Text>
                </TouchableOpacity>
            )
        }

    <DateTimePickerModal
        isVisible={visible}
        mode={mode}
        onConfirm={onConfirm}
        onCancel={onCancel}
        date={stDate}
    />
    </View>
  )
}

export default StartTimePicker

const sty = StyleSheet.create({
    container:{
      zIndex:20,
      flex:1,
      alignItems:'center'
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