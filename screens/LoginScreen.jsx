import { StyleSheet, View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../context/AuthProvider'

import {FormButton, FormButtonWithImage} from '../component/FormButton'
import {FormInput} from '../component/FormInput'

import { validateEmail, removeWhitespace } from '../utils/Validate'

const LoginScreen = ({navigation}) => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  
  const {signin} = useContext(AuthContext);

  const handleLogin = () => {
    if(email) {
        const changeEmail = removeWhitespace(email);
        if(!validateEmail(changeEmail)){
            Alert.alert('올바른 형식의 이메일을 입력하세요.');
            return
        }

        
    }else{
        Alert.alert('이메일을 입력하세요.');
        return
    }
    
    if(!password){
        Alert.alert('비밀번호를 입력하세요.');
        return
    }
    signin(email, password);
  } 


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={sty.container}>
            <ScrollView>
                <View style={[sty.row, sty.titleContainer]}>
                    <Image source={require('../assets/images/heels.png')}
                           style={{width:40,height:24,marginTop:7}} />
                    <Text style={sty.titleText}>로그인</Text>
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}>
                        <FormInput
                            labelValue={email}
                            onChangeText={(text)=>setEmail(text)}
                            placeholderText='email'
                            iconType='user'
                            autoCapitalize='none'
                            autoCorrect={false}
                            keyboardType='email-address'
                        />
                        <FormInput
                            labelValue={password}
                            onChangeText={(text)=>setPassword(text)}
                            placeholderText='password'
                            iconType='lock'
                            secureTextEntry={true}
                        />
                </KeyboardAvoidingView>

                <TouchableOpacity onPress={()=>{}}>
                    <Text 
                        style={sty.forgotPasswordText}>
                        비밀번호를 잊어버리셨나요?
                    </Text>
                </TouchableOpacity>

                <FormButton
                    buttonTitle='로그인'
                    onPress={handleLogin}
                    backgroundColor='#B7E49F'
                />

                <View style={[sty.row, sty.signupContainer]}>
                    <Text>아직 회원이 아니신가요? </Text>
                    <TouchableOpacity>
                        <Text 
                            onPress={()=>navigation.navigate('Signup')} 
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

                <FormButtonWithImage
                    buttonTitle='구글로 로그인'
                    backgroundColor='#ffffff'
                    src={require('../assets/images/google.png')}
                />
                <FormButtonWithImage
                    buttonTitle='카카오톡으로 로그인'
                    backgroundColor='#ffdc00'
                    src={require('../assets/images/kakao.png')}
                />
                <FormButtonWithImage
                    buttonTitle='트위터로 로그인'
                    backgroundColor='#00acee'
                    src={require('../assets/images/twitter.png')}
                    color='#ffffff'
                />

            </ScrollView>
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
    forgotPasswordText:{
        color:'#999999',
        textDecorationLine:'underline',
        textDecorationStyle:'solid',
        textAlign:'right',
        marginTop:-5,
        marginBottom:10
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
    }

    ,row:{
        flexDirection:'row'
    }
})

export default LoginScreen