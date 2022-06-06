import { View, Text, Animated , ScrollView,useWindowDimensions } from 'react-native'
import React, { useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SafeAreaView from 'react-native-safe-area-view';
import AnimatedHeader from './src/components/AnimatedHeader';
import FavouriteContact from './src/components/FavouriteContact';
import ContactRowContainer from './src/components/ContactRowContainer';
import { NativeBaseProvider } from "native-base";
import Temp from "./src/components/Temp";
import { FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigators/StackNavigator';


const App = () => {
  const {height,width} = useWindowDimensions()
  const offset = useRef(new Animated.Value(0)).current;

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}

export default App