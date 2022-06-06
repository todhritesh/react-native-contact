import { View, Text , StyleSheet } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const FavouriteContact = () => {

    const styles = StyleSheet.create({
        container:{
            flexDirection:'row',
            alignItems:'center',
            width:'100%',
            borderRadius:20,
            backgroundColor:"#2d3436",
            padding:10,
            marginTop:80
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
    <View style={styles.container}>
      <View style={styles.left}>
        <MaterialCommunityIcons name="account-circle" size={33} color="darkorange"/>
      </View>
      <View style={styles.right}>
        <Text style={styles.text}>Add your favourite contacts</Text>
      </View>
    </View>
  )
}

export default FavouriteContact