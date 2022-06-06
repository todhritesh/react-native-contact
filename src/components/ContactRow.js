import { View, Text , StyleSheet } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Directions, Gesture, GestureDetector , TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar} from "native-base";


const ContactRow = ({name,number,showNumber,id}) => {

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
            fontSize:16,
            fontWeight:"600"
        }
    })
  return (
<GestureDetector gesture={flingGestureLeft}>
    {/* <TouchableOpacity onPress={()=>console.log("hello")}> */}
      <View style={styles.container}>
      <View style={styles.left}>
      <Avatar bg="amber.600" size={35} source={{
          // uri: "https://bit.ly/broken-link"
        }}>
            {String(name).toUpperCase()[0]}
      </Avatar>
      </View>
      <View style={styles.right}>
        <Text style={styles.text}>{name}</Text>
        {showNumber.key === id && showNumber.status ? <Text style={[styles.text,{fontSize:12}]}>{number}</Text>:null}
      </View>
    </View>
    {/* </TouchableOpacity> */}
  </GestureDetector>
  )
}

export default ContactRow