import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

const SignupScreen = () => {

  const navigation = useNavigation();
  const handleSignup = () => {
    navigation.navigate('Signup');
  }

//   if(initializing) return null;

//   if(!user){
//         return (
//             <SafeAreaView>
//                 <Text>SignupScreen</Text>
//                 <Button onPress={handleSignup} title='회원가입' color='#1553a3' />
//             </SafeAreaView>
//         )
//   }


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={sty.container}>
            <View style={[sty.row, sty.titleContainer]}>
                <Image source={require('../assets/images/heels.png')}
                       style={{width:40,height:24,marginTop:7}} />
                <Text style={sty.titleText}>회원가입</Text>
            </View>
            
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <View style={sty.label}>
                        <Text>이름</Text>
                    </View>
                    <TextInput 
                        type='text'
                        placeholder='name'
                        style={sty.input}
                    />
                    <View style={sty.label}>
                        <Text>이메일</Text>
                    </View>
                    <TextInput 
                        type='email'
                        placeholder='email'
                        style={sty.input}
                    />
                    <View style={sty.label}>
                        <Text>비밀번호</Text>
                    </View>
                    <TextInput 
                        type='password'
                        placeholder='name'
                        style={sty.input}
                    />
                    <View style={sty.label}>
                        <Text>별명</Text>
                    </View>
                    <TextInput 
                        type='text'
                        placeholder='name'
                        style={sty.input}
                    />
                    <View style={sty.label}>
                        <Text>생일</Text>
                    </View>
                    <TextInput 
                        type='text'
                        placeholder='name'
                        style={sty.input}
                    />
                    <View style={sty.label}>
                        <Text>뭐지</Text>
                    </View>
                    <TextInput 
                        type='text'
                        placeholder='name'
                        style={sty.input}
                    />
            </KeyboardAvoidingView>
                    

            <TouchableOpacity style={sty.emailLoginContainer}>
                <Text>회원가입</Text>
            </TouchableOpacity>            
        </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const sty = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:30,
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
    label:{
        flex:1,
        position: 'absolute',
        alignSelf:'center'
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
    emailLoginContainer:{
        backgroundColor:'#B7E49F',
        height:50,
        borderRadius:9,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
        elevation:2
    }


    ,row:{
        flexDirection:'row'
    }
})

export default SignupScreen