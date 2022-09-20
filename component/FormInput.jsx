import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { windowWidth, windowHeight } from '../utils/Dimention'
import AntDesign from 'react-native-vector-icons/AntDesign'

export const FormInput = ({labelValue, placeholderText, iconType, ...rest}) => {
  return (
    <View style={[sty.inputContainer, sty.row]}>
      <View>
        <AntDesign 
            name={iconType} 
            size={25} 
            color='#999'
        />
      </View>
      <TextInput 
          value={labelValue}
          numberOfLines={1}
          placeholder={placeholderText}
          {...rest}
          style={sty.input}
      />
    </View>
  )
}

const sty = StyleSheet.create({
    inputContainer:{
      height:60,
      borderWidth:2,
      borderColor:'#dddddd',
      borderRadius:8,
      marginBottom:10,
      padding:0,
      paddingHorizontal:10,
      justifyContent:'space-evenly',
      alignItems:'center'
    },
    inputIconContainer:{
    },
    inputIcon:{

    },
    input:{
      fontSize:22,
      width:'90%'
    },
    row:{
      flexDirection:'row'
    }
})