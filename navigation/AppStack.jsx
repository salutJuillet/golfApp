import React, {useContext} from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { View, TouchableOpacity, Text } from 'react-native'

import HomeScreen from '../screens/HomeScreen'
import BoardScreen from '../screens/BoardScreen'
import DetailScreen from '../screens/DetailScreen'
import DetailDataScreen from '../screens/DetailDataScreen';
import MessagesScreen from '../screens/MessagesScreen'
import ChatScreen from '../screens/ChatScreen'
import ProfileScreen from '../screens/ProfileScreen'
import EditProfileScreen from '../screens/EditProfileScreen'

import { AuthContext } from '../context/AuthProvider';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStack = ({navigation}) => {

  const {logout} = useContext(AuthContext);

  return (
    <Stack.Navigator 
        screenOptions={{
          headerStyle:{
            backgroundColor:'#B7E49F',
          },
          headerTitleAlign:'center',
          headerTitleStyle:{
            color:'#333',
            fontSize:18
          }
        }}>
      <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            headerLeft:()=>(
              <TouchableOpacity
                style={{
                    marginLeft:15, 
                    backgroundColor:'#81c25f',
                    borderRadius:6,
                    paddingVertical:5,
                    paddingHorizontal:5,
                  }}
                onPress={logout}
                >
                <Text style={{color:'#000'}}>๋ก๊ทธ์์</Text>
              </TouchableOpacity>
            ),
            headerRight:()=>(
              <TouchableOpacity style={{marginRight:15}}>
                <AntDesign
                    name='pluscircle'
                    size={22}
                    color='#333'
                    onPress={()=>navigation.navigate('Board')}
                />
              </TouchableOpacity>
            )
          }}
      />
      <Stack.Screen
          name='Board'
          component={BoardScreen}
          options={{headerTitle:'๊ทธ๋ฃน ๊ฐ์ค'}}
      />
      <Stack.Screen
          name='Detail'
          component={DetailScreen}
      />
      <Stack.Screen
          name='DetailData'
          component={DetailDataScreen}
          options={{
            headerTitle:'INFO'
          }}
      />
    </Stack.Navigator>
  )
}

const MessageStack = ({navigation}) => (
  <Stack.Navigator
      screenOptions={{
        headerStyle:{
          backgroundColor:'#B7E49F',
        },
        headerTitleAlign:'center',
        headerTitleStyle:{
          color:'#333',
          fontSize:18
        }
      }}
  >
    <Stack.Screen
        name='Messages'
        component={MessagesScreen}
    />
    <Stack.Screen
        name='Chat'
        component={ChatScreen}
        options={({route})=>({
          title: route.params.username,
          headerBackTitleVisible: false
        })}
    />
  </Stack.Navigator>
)

const ProfileStack = ({navigation}) => (
  <Stack.Navigator
      screenOptions={{
        headerStyle:{
          backgroundColor:'#B7E49F',
        },
        headerTitleAlign:'center',
        headerTitleStyle:{
          color:'#333',
          fontSize:18
        }
      }}
  >
    <Stack.Screen
        name='Profile'
        component={ProfileScreen}
    />
    <Stack.Screen
        name='EditProfile'
        component={EditProfileScreen}
        options={{
          headerTitle: 'ํ๋กํ ์์?',
          headerRight:()=>(
            <TouchableOpacity 
                onPress={()=>{}} 
                style={{
                  marginRight:15, 
                  backgroundColor:'#fff', 
                  color:'#333',
                  borderRadius:5,
                  paddingVertical:4,
                  paddingHorizontal:6,
                  elevation:1
                }}
            >
              <Text>์?์ฅ</Text>
            </TouchableOpacity>
          )
        }}
    />
  </Stack.Navigator>
)

const AppStack = ({navigation}) => {

  /* ํน์? ํ์ด์ง์์๋ bottom tab์ด ๋ณด์ด์ง ์๋๋ก ํ๋ ํจ์ */
  const getTabBarVisibility = (route) => {
    const routeName = route.state
                      ? route.state.routes[route.state.index].name
                      : '';
    
    if(routeName === 'Chat'){
      return false;
    }
    
    return true;
  }


  return (
    <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#81c25f',
          headerShown: false
        }}
    >
      <Tab.Screen 
          name='FeedStack' 
          component={FeedStack}
          options={({route})=>({
            tabBarIcon:({color, size}) => (
              <AntDesign
                  name='home'
                  color={color}
                  size={size}
              />
            )
          })}
      />
      <Tab.Screen 
          name='MessageStack' 
          component={MessageStack}
          options={({route})=>({
            tabBarVisible: getTabBarVisibility(route),
            tabBarIcon:({color, size}) => (
              <AntDesign
                  name='mail'
                  color={color}
                  size={size}
              />
            )
          })}
      />
      <Tab.Screen 
          name='ProfileStack' 
          component={ProfileStack}
          options={({route})=>({
            tabBarIcon:({color, size}) => (
              <AntDesign
                  name='user'
                  color={color}
                  size={size}
              />
            )
          })}
      />
    </Tab.Navigator>
  )
}

export default AppStack