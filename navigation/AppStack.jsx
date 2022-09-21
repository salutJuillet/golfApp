import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign'

import HomeScreen from '../screens/HomeScreen'
import MessagesScreen from '../screens/MessagesScreen'
import ChatScreen from '../screens/ChatScreen'
import ProfileScreen from '../screens/ProfileScreen'
import EditProfileScreen from '../screens/EditProfileScreen'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStack = ({navigation}) => {
  <Stack.Navigator>
    <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerTitleAlign:'center',
          headerTitleStyle:{
            fontWeight:'bold',
            fontSize:18
          },
          headerStyle:{
            backgroundColor:'#B7E49F',
            elevation:2
          },
          headerRight:()=>(
            <View style={{marginTop:10}}>
              <AntDesign.Button 
                  name='pluscircle'
                  size={22}
                  color='#ffffff'
                  onPress={()=>navigation.navigate('Board')}
              />
            </View>
          )
        }}
    />
  </Stack.Navigator>
}

const MessageStack = ({navigation}) => {
  <Stack.Navigator>
    <Stack.Screen
        name='Messages'
        component={MessagesScreen}
        options={{
          headerShown: false
        }}
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
}

const ProfileStack = ({navigation}) => {
  <Stack.Navigator>
    <Stack.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          headerShown: false
        }}
    />
    <Stack.Screen
        name='EditProfile'
        component={EditProfileScreen}
        options={{
          headerTitle: '프로필 수정'
        }}
    />
  </Stack.Navigator>
}

const AppStack = () => {

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
        screenOptions={{tabBarActiveTintColor: '#81c25f'}}
    >
      <Tab.Screen 
          name='Home' 
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
          name='Messages' 
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
          name='Profile' 
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