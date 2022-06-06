import { View, Text, Animated , ScrollView,useWindowDimensions } from 'react-native'
import React, { useRef , useState} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SafeAreaView from 'react-native-safe-area-view';
import AnimatedHeader from '../components/AnimatedHeader';
import FavouriteContact from '../components/FavouriteContact';
import ContactRowContainer from '../components/ContactRowContainer';
import Temp from "../components/Temp";
import { FlatList } from 'react-native';

const Home = () => {
  const {height,width} = useWindowDimensions()
  const offset = useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always' }}>
        <AnimatedHeader animatedValue={offset} />
        <FlatList
          style={{ flex: 1, backgroundColor: '#000000',paddingTop:width<height?(height*40)/100+10:(height*80)/100+10}}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: offset } } }],
            { useNativeDriver: false }
          )}

          ListHeaderComponent={()=>(
            <>
            <FavouriteContact />
            <ContactRowContainer />
            </>
          )}

         />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Home

