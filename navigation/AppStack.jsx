import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { TouchableOpacity } from 'react-native'
import { FormButton } from '../component/FormButton'

const AppStack = () => {

  const {logout} = useContext(AuthContext)

  return (
    <View>
      <FormButton 
          buttonTitle='로그아웃'
          onPress={logout}
          backgroundColor='#B7E49F'
      />
      {/* <TouchableOpacity onPress={logout}>

      </TouchableOpacity> */}
    </View>
  )
}

export default AppStack