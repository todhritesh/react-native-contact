import React from 'react';
import { Animated, View, Text , useWindowDimensions} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ActionRow from './ActionRow';

const AnimatedHeader = ({ animatedValue }) => {
  const {height,width} = useWindowDimensions()
  const HEADER_HEIGHT = width<height?(height*45)/100:(height*80)/100;
    const insets = useSafeAreaInsets();
    
    const headerOpacity = React.useState(animatedValue.interpolate({
      inputRange: [0, (HEADER_HEIGHT + insets.top)],
      outputRange: [1 , 0.0001],
      extrapolate:"clamp"
    }))[0];
    const headerHeight = animatedValue.interpolate({
        inputRange: [0, HEADER_HEIGHT + insets.top],
        outputRange: [HEADER_HEIGHT + insets.top, insets.top + 45],
        extrapolate:"clamp"
      });

  return (
    <Animated.View
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      height: headerHeight,
      backgroundColor: '#000000',
      alignItems:'center',
      justifyContent:'space-around',
    }}
  >
    <Animated.View style={{justifyContent:'center' , alignItems:'center',marginTop:50,opacity:headerOpacity}}>
      <MaterialCommunityIcons name="account-circle"  size={100} color="#f1c40f"/>
      <Animated.Text style={{color:'white',fontSize:25,opacity:headerOpacity}} >Dhritesh Kumar</Animated.Text>
    </Animated.View>
    <ActionRow />
  </Animated.View>
  );
};

export default AnimatedHeader;