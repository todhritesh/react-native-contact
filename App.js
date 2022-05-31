import { View, Text, Animated , ScrollView,useWindowDimensions } from 'react-native'
import React, { useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SafeAreaView from 'react-native-safe-area-view';
import AnimatedHeader from './src/components/AnimatedHeader';
import DATA from './src/assets/Data';
import FavouriteContact from './src/components/FavouriteContact';
import ContactRowContainer from './src/components/ContactRowContainer';
import Temp from "./src/components/Temp";


const App = () => {
  const {height,width} = useWindowDimensions()
  const offset = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always' }}>
        <AnimatedHeader animatedValue={offset} />
        <ScrollView
          style={{ flex: 1, backgroundColor: '#000000',paddingTop:width<height?(height*40)/100+10:(height*80)/100+10 }}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: offset } } }],
            { useNativeDriver: false }
          )}
        >
          
          <FavouriteContact />
          <ContactRowContainer />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
    // <Temp />
  )
}

export default App