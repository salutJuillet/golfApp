import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { windowHeight, windowWidth } from '../utils/Dimention'
import React from 'react'

import FontAwesome from 'react-native-vector-icons/FontAwesome'

const SocialButton = ({buttonTitle, btnType, color, backgroundColor, ...rest}) => {
  return (
    <TouchableOpacity style={[sty.buttonContainer, {backgroundColor: backgroundColor}]} {...rest}>
        <View style={sty.iconWrapper}>
            <FontAwesome name={btnType} style={sty.icon} size={22} color={color} />
        </View>
        <View style={sty.buttonTextWrapper}>
            <Text style={[sty.buttonText, {color}]}>
                {buttonTitle}
            </Text>
        </View>
    </TouchableOpacity>
  )
}

export default SocialButton

const sty = StyleSheet.create({
    buttonContainer:{
        marginTop:10,
        width: '100%',
        height: windowHeight / 15,
        padding:10,
        flexDirection:'row',
        borderRadius:5
    },
    iconWrapper:{
        width:30,
        justifyContent:'center',
        alignItems:'center'
    },
    icon:{
        fontWeight:'bold'
    },
    buttonTextWrapper:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonText:{
        fontSize:18,
        fontWeight:'bold'
    }
})