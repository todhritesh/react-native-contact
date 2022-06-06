import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const LogoScreen = () => {
  return (
    <View style={styles.container} >
        <MaterialCommunityIcons name="account-circle" color="darkorange" size={250} />
    </View>
  )
}

export default LogoScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'black'
    },
})