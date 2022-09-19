import {TouchableOpacity, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

export const FormButton = ({buttonTitle, bgColor, ...rest}) => {
    return (
        <TouchableOpacity style={[sty.button, {backgroundColor: bgColor}]} {...rest}>
            <Text>{buttonTitle}</Text>
        </TouchableOpacity>
    )
}

// export const FormButtonWithImage = ({buttonTitle, bgColor, socialMedia, ...rest}) => {
//     return (
//         <TouchableOpacity style={[sty.button, sty.row, {backgroundColor: bgColor}]}>
//             <Image source={require(`/assets/${socialMedia}.png`)}
//                 style={sty.icon} />
//             <Text>{buttonTitle}</Text>
//         </TouchableOpacity>
//     )
// }

const sty = StyleSheet.create({
    button:{
        height:50,
        borderRadius:9,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
        elevation:2
    },
    row:{
        flexDirection:'row'
    },
    icon:{
        height:20,
        width:20,
        marginRight:3
    }
})