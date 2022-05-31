import { View, Text , StyleSheet } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler'


const ContactRow = ({name}) => {

  const flingGestureLeft = Gesture.Fling().direction(Directions.LEFT).onEnd(()=>alert("swiped"));

    const styles = StyleSheet.create({
        container:{
            flexDirection:'row',
            alignItems:'center',
            width:'100%',
            backgroundColor:"#2d3436",
            padding:10,
            borderColor:'black',
            borderBottomWidth:1,
        },
        left:{

        },
        right:{
          marginLeft:20
        },
        text:{
            color:"white",
            fontSize:18,
            fontWeight:"600"
        }
    })
  return (
<GestureDetector gesture={flingGestureLeft}>
      <View style={styles.container}>
      <View style={styles.left}>
        <MaterialCommunityIcons name="account-circle" size={33} color="darkorange"/>
      </View>
      <View style={styles.right}>
        <Text style={styles.text}>{name}</Text>
      </View>
    </View>
  </GestureDetector>
  )
}

export default ContactRow