import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../context/AuthProvider'

import {FormButton, FormButtonWithImage} from '../component/FormButton'

const LoginScreen = ({navigation}) => {

  const navigator = useNavigation();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {login} = useContext(AuthContext);


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={sty.container}>
            <View style={[sty.row, sty.titleContainer]}>
                <Image source={require('../assets/heels.png')}
                       style={{width:40,height:24,marginTop:7}} />
                <Text style={sty.titleText}>로그인</Text>
            </View>
            
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <TextInput 
                        placeholder='email'
                        style={sty.input}
                    />
                    <TextInput 
                        placeholder='password'
                        style={sty.input}
                    />
            </KeyboardAvoidingView>
                    
            <FormButton
                buttonTitle='로그인'
                onPress={()=>login(email, password)}
                bgColor='#B7E49F'
            />

            <View style={[sty.row, sty.signupContainer]}>
                <Text>아직 회원이 아니신가요? </Text>
                <TouchableOpacity>
                    <Text 
                        onPress={()=>navigator.navigate('Signup')} 
                        style={sty.signupText}>
                        회원가입
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={sty.seperatorContainer}>
                <View style={sty.seperator} />
                <View style={{position:'absolute',alignSelf:'center', flex:1}}>
                    <Text style={sty.or}>또는</Text>
                </View>
            </View>

            <TouchableOpacity style={[sty.emailLoginContainer, sty.row,{backgroundColor:'#ffffff'}]}>
                <Image source={require('../assets/google.png')}
                    style={sty.icon} />
                <Text>구글로 로그인</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[sty.emailLoginContainer, sty.row,{backgroundColor:'#ffdc00'}]}>
                <Image source={require('../assets/kakao.png')}
                    style={sty.icon} />
                <Text>카카오톡으로 로그인</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[sty.emailLoginContainer, sty.row,{backgroundColor:'#00acee'}]}>
                <Image source={require('../assets/twitter.png')}
                    style={sty.icon} />
                <Text style={{color:'#ffffff'}}>트위터로 로그인</Text>
            </TouchableOpacity>
            
        </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const sty = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:30,
        backgroundColor:'#f2f2f2'
    },
    titleContainer:{
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:50
    },
    titleText:{
        fontSize:30,
        marginLeft:3,
    },
    input:{
        height:60,
        borderWidth:2,
        borderColor:'#dddddd',
        borderRadius:8,
        marginBottom:10,
        padding:0,
        paddingHorizontal:10,
        fontSize:20
    },
    emailLoginContainer:{
        backgroundColor:'#B7E49F',
        height:50,
        borderRadius:9,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
        elevation:2
    },
    signupContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    },
    signupText:{
        color:'#1E90FF',
        textDecorationLine:'underline',
        textDecorationStyle:'solid',
        fontWeight:'bold'
    },
    seperatorContainer:{
        paddingHorizontal:2,
        marginTop:30
    },
    seperator:{
        height:1,
        backgroundColor:'#333',
        marginTop:10,
        marginBottom:30
    },
    or:{
        backgroundColor:'#f2f2f2',
        paddingHorizontal:10,
        color:'#000000'
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

export default LoginScreen