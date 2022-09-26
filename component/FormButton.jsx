import {TouchableOpacity, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

export const FormButton = ({buttonTitle, backgroundColor, ...rest}) => {
    return (
        <TouchableOpacity 
            style={[sty.buttonContainer, {backgroundColor: backgroundColor}]} 
            {...rest}>
                <Text>{buttonTitle}</Text>
        </TouchableOpacity>
    )
}

export const FormButtonWithImage = ({buttonTitle, backgroundColor, src, color, ...rest}) => {
    return (
        <TouchableOpacity 
            style={[sty.buttonContainer, sty.row, {backgroundColor: backgroundColor}]}
            {...rest}>
                <Image source={src}
                       style={sty.icon} />
                <Text style={{color:color}}>{buttonTitle}</Text>
        </TouchableOpacity>
    )
}

const sty = StyleSheet.create({
    buttonContainer:{
        height:50,
        borderRadius:9,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:20,
        elevation:2
    },
    icon:{
        height:20,
        width:20,
        marginRight:3
    }

    ,row:{
        flexDirection:'row'
    }
})