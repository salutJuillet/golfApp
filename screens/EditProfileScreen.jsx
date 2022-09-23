import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView,
  TouchableOpacity, 
  Alert, 
  ImageBackground, 
  TextInput, 
  Platform, 
  Switch,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native'
import React, { useEffect, useContext, useState, useRef} from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Animated from 'react-native-reanimated'
import BottomSheet from 'reanimated-bottom-sheet'
import ImageCropPicker from 'react-native-image-crop-picker'

import { AuthContext } from '../context/AuthProvider'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

import {FormButton} from '../component/FormButton'


const EditProfileScreen = ({navigation, route}) => {

  const {user, logout} = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [userData, setUserData] = useState({
    age:0,
    average:0,
    email: user.uid,
    fname:'',
    gender:false,
    tel:'',
    userImg: null
  });

  /* 회원정보 가져오기 */
  const getUser = async () => {
    await firestore().collection('members')
                      .doc(route.params ? route.params.email : user.uid)
                      .get()
                      .then((res) => {
                        //  console.log(res.data());
                        if(res.exists){
                          setUserData(res.data());
                        }
                      })
  }

  const toggleSwitch = () =>{
    const gnd = !userData.gender;
    setUserData({...userData, gender: gnd});
  }

  useEffect(()=>{
    getUser();
  }, []);

  const takPhotoFromCamera = () => {
    console.log('');
  }

  const takePhotoFromGallery = () => {
    console.log('');
  }

  //this에 들어있기 때문에 선언 안 해도 된다.
  renderInner = () => (
    <View style={sty.panel}>
      <View style={{alignItems:'center'}}>
        <Text style={sty.panelTitle}>사진 업로드</Text>
        <Text style={sty.panelSubtitle}>프로필 사진을 선택하세요.</Text>
      </View>
      <TouchableOpacity
          style={sty.panelButton}
          onPress={takPhotoFromCamera}
      >
        <Text style={sty.panelButtonTitle}>사진 촬영하기</Text>
      </TouchableOpacity>
      <TouchableOpacity
          style={sty.panelButton}
          onPress={takePhotoFromGallery}
      >
        <Text style={sty.panelButtonTitle}>갤러리에서 가져오기</Text>
      </TouchableOpacity>
      <TouchableOpacity
          style={sty.panelButton}
          onPress={()=>this.bs.current.snapTo(1)}
      >
        <Text style={sty.panelButtonTitle}>취소</Text>
      </TouchableOpacity>
    </View>
  )

  renderHeader = () => (
    <View style={sty.header}>
      <View style={sty.panelHeader}>
        <View style={sty.panelHandle} />
      </View>
    </View>
  )

  bs = React.createRef();
  fall = new Animated.Value(1);

  const { age, average, email, fname, gender, tel, userImg } = userData;


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={sty.container}>
        <BottomSheet
            ref={this.bs}
            snapPoints={[330, -15]}
            renderContent={this.renderInner}
            renderHeader={this.renderHeader}
            initialSnap={1}
            callbackNode={this.fall}
            endabledGestureInteraction={true}
        />
        <View style={{alignItems:'center'}}>
          <TouchableOpacity onPress={()=>{}}>
            <View style={{
                    height:100, 
                    width:100, 
                    borderRadius:15,
                    justifyContent:'center',
                    alignItems:'center',
                    marginTop:20
                  }}
            >
              <ImageBackground
                  source={{
                    uri: image ? image : userData ? userImg : 'https://firebasestorage.googleapis.com/v0/b/my-app-12524.appspot.com/o/members%2Floading.png?alt=media&token=e8e03897-0d43-4924-bdae-70eb97009604' 
                  }}
                  style={{width:100, height:100}}
                  imageStyle={{borderRadius:15}}
              >
                <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                  <AntDesign 
                      name='camera' 
                      size={35} 
                      color='#fff' 
                      style={{
                        opacity:0.7,
                        alignItems:'center', 
                        justifyContent:'center', 
                        borderWidth:1,
                        borderColor:'#fff', 
                        borderRadius:10
                      }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{marginTop:10, fontSize:18, fontWeight:'bold'}}>
            {userData ? email : user.email}님
          </Text>
        </View>

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={sty.actioninputContainer}>
            <Image source={require('../assets/images/heels.png')} style={sty.iconImage} />
            <TextInput
                value={fname}
                onChangeText={(text)=>setUserData({...userData, fname: text})}
                placeholder='닉네임'
                placeholderTextColor='#999'
                autoCorrect={false}
                style={sty.textInput}
            />
          </View>

          <View style={sty.actioninputContainer}>
            <Image source={require('../assets/images/heels.png')} style={sty.iconImage} />
            <View style={sty.gender}>
              <Text style={[!gender ? {fontWeight:'bold'} : '', {fontSize:18,color:'#999'}]}>여자</Text>
                <Switch
                    trackColor={{false:'#81c25f', true:'#B7E49F'}}
                    thumbColor={gender && '#f4f4f4'}
                    ios_backgroundColor='#3e3e3e'
                    onValueChange={toggleSwitch}
                    value={gender}
                />
              <Text style={[gender ? {fontWeight:'bold'} : '', {fontSize:18,color:'#999'}]}>남자</Text>
            </View>
          </View>

          <View style={sty.actioninputContainer}>
            <Image source={require('../assets/images/heels.png')} style={sty.iconImage} />
            <TextInput
                value={age}
                onChangeText={(text)=>setUserData({...userData, age: text})}
                placeholder='나이'
                placeholderTextColor='#999'
                autoCorrect={false}
                style={sty.textInput}
                keyboardType='numeric'
            />
          </View>

          <View style={sty.actioninputContainer}>
            <Image source={require('../assets/images/heels.png')} style={sty.iconImage} />
            <TextInput
                value={tel}
                onChangeText={(text)=>setUserData({...userData, tel: text})}
                placeholder='전화번호'
                placeholderTextColor='#999'
                autoCorrect={false}
                style={sty.textInput}
                keyboardType='numeric'
            />
          </View>

          <View style={sty.actioninputContainer}>
            <Image source={require('../assets/images/heels.png')} style={sty.iconImage} />
            <TextInput
                value={average}
                onChangeText={(text)=>setUserData({...userData, average: text})}
                placeholder='평균타수'
                placeholderTextColor='#999'
                autoCorrect={false}
                style={sty.textInput}
                keyboardType='numeric'
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}

export default EditProfileScreen

const sty = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f2f2f2',
  },
  commandButton:{
    padding:15,
    borderRadius:10,
    backgroundColor:'#B7E49F',
    alignItems:'center',
    marginTop:10
  },
  panel:{
    padding:20,
    backgroundColor:'',
    width:'100%'
  },
  header:{
    backgroundColor:'',
    shadowColor:'#333',
    shadowOffset:{width:-1, height:-3},
    shadowRadius:2,
    shadowOpacity:0.4,
    paddingTop:20,
    borderTopLeftRadius:20,
    borderTopRightRadius:20
  },
  panelHeader:{
    alignItems:'center',
  },
  panelHandle:{
    width:40,
    height:8,
    borderRadius:5,
    backgroundColor:'#00000040',
    amrginBottom:10,
  },
  panelTitle:{
    fontSize:28,
    height:35
  },
  panelSubtitle:{
    fontSize:15,
    color:'#999',
    height:30,
    marginBottom:10
  },
  panelButton:{
    padding:13,
    borderRadius:10,
    backgroundColor:'#81c25f',
    alignItems:'center',
    marginVertical:7
  },
  panelButtonTitle:{
    fontSize:18,
    fontWeight:'bold',
    color:'#fff'
  },
  iconImage:{
    width:30,
    height:16,
    marginTop:5
  },
  actioninputContainer:{
    flexDirection:'row',
    marginVertical:5,
    borderBottomWidth:1,
    borderBottomColor:'#d2d2d2',
    paddingBottom:5,
    marginHorizontal:30,
    alignItems:'center',
  },
  actioninputErrorContainer:{
    flexDirection:'row',
    marginVertical:5,
    borderBottomStyle:'dotted',
    borderBottomWidth:1,
    borderBottomColor:'#ff6767',
    paddingBottom:5
  },
  textInput:{
    flex:1,
    paddingLeft:10,
    color:'#333',
    fontSize:18,
    marginTop:0,
    marginBottom:-5,
  },
  gender:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    paddingLeft:10,
    marginVertical:5,
  }
})