import { View, Text } from 'react-native'
import React,{useEffect,useState} from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home'
import ContactDetail from '../screens/ContactDetail'
import LogoScreen from '../screens/LogoScreen'

const Stack = createStackNavigator()
const StackNavigator = () => {
  const [showLogo,setShowLogo] = useState(true)
  useEffect(()=>{
    setTimeout(()=>{
      setShowLogo(false)
    },2000)
  },[])
  return (
    <Stack.Navigator >
        {showLogo && <Stack.Screen component={LogoScreen} name="logo" options={{headerShown:false}} />}
        <Stack.Screen component={Home} name="home" options={{headerShown:false}} />
        <Stack.Screen component={ContactDetail} name="contactDetail" options={{headerShown:false}} />
    </Stack.Navigator>
  )
}

export default StackNavigator