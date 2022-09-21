import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView, Alert } from 'react-native'
import React, {useState, useContext} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../context/AuthProvider'
import { validateEmail, removeWhitespace } from '../utils/Validate'

import AntDesign from 'react-native-vector-icons/AntDesign'

import FormButton from '../component/FormButton'
import FormInput from '../component/FormInput'
import SocialButton from '../component/SocialButton'

const SignupScreen = ({navigation}) => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [repassword, setRepassword] = useState();

  const {signup} = useContext(AuthContext);

  const handleSignup = () => {
    if(email) {
        const changeEmail = removeWhitespace(email);
        if(validateEmail(changeEmail)){
            console.log(validateEmail(changeEmail));
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
    if(!repassword) {
        Alert.alert('비밀번호를 다시 확인해주세요.');
        return
    }
    if(password !== repassword) {
        Alert.alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
        return
    }
    signup(email, password);
  }


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={sty.container}>
            <ScrollView>
                <View style={[sty.row, sty.titleContainer]}>
                    <Image source={require('../assets/heels.png')}
                        style={{width:40,height:24,marginTop:7}} />
                    <Text style={sty.titleText}>회원가입</Text>
                </View>
                
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}>
                        <View style={sty.inputContainer}>
                            <View style={sty.label}>
                                <Text>이메일</Text>
                            </View>
                            <TextInput 
                                type='email'
                                onChangeText={(text)=>setEmail(text)}
                                placeholder='email'
                                style={sty.input}
                            />
                        </View>
                        
                        <View style={sty.inputContainer}>
                            <View style={sty.label}>
                                <Text>비밀번호</Text>
                            </View>
                            <TextInput 
                                type='password'
                                onChangeText={(text)=>setPassword(text)}
                                placeholder='password'
                                style={sty.input}
                                secureTextEntry={true}
                            />
                        </View>
                        
                        <View style={sty.inputContainer}>
                            <View style={sty.label}>
                                <Text>비밀번호 확인</Text>
                            </View>
                            <TextInput 
                                type='password'
                                onChangeText={(text)=>setRepassword(text)}
                                placeholder='confirm password'
                                style={sty.input}
                                secureTextEntry={true}
                            />
                        </View>

                        {/* <View style={sty.inputContainer}>
                            <View style={sty.label}>
                                <Text>이름</Text>
                            </View>
                            <TextInput 
                                type='text'
                                placeholder='name'
                                style={sty.input}
                            />
                        </View>

                        <View style={sty.inputContainer}>
                            <View style={sty.label}>
                                <Text>성별</Text>
                            </View>
                            <TextInput 
                                type='text'
                                placeholder='gender'
                                style={sty.input}
                            />
                        </View>

                        <View style={sty.inputContainer}>
                            <View style={sty.label}>
                                <Text>전화번호</Text>
                            </View>
                            <TextInput 
                                type='text'
                                placeholder='mobile'
                                style={sty.input}
                            />
                        </View> */}
                </KeyboardAvoidingView>
                        

                <TouchableOpacity
                    onPress={handleSignup}
                    style={sty.buttonContainer}>
                    <Text>회원가입</Text>
                </TouchableOpacity>  
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
        marginLeft:3
    },
    inputContainer:{
        position:'relative',
        paddingVertical:5
    },
    label:{
        flex:1,
        position: 'absolute',
        left:10,
        top:-4,
        alignSelf:'center',
        backgroundColor:'#f2f2f2',
        zIndex:10,
        paddingHorizontal:5
    },
    input:{
        height:60,
        borderWidth:1,
        borderColor:'#ababab',
        borderRadius:8,
        marginBottom:10,
        padding:0,
        paddingHorizontal:10,
        fontSize:20
    },
    buttonContainer:{
        backgroundColor:'#B7E49F',
        height:50,
        borderRadius:9,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
        marginBottom:25,
        elevation:2
    }

    ,row:{
        flexDirection:'row'
    },
    any:{
        color:'#2e64e5',
        marginTop:25
    }
})

export default SignupScreen