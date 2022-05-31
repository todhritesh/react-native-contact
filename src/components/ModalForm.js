import { StyleSheet, Text, View , Modal ,TouchableOpacity, useWindowDimensions , TextInput } from 'react-native'
import React,{useState} from 'react'
import Entypo from "react-native-vector-icons/Entypo"
import {firebase} from "@react-native-firebase/database"

const ModalForm = ({openForm,setOpenForm}) => {
    const db = firebase.app().database("https://native-app-cca2d-default-rtdb.asia-southeast1.firebasedatabase.app/")
    const {height,width} = useWindowDimensions()
    const [name,setName] = useState("")
    const [number,setNumber] = useState("")
    let formData = {}
    const styles = StyleSheet.create({
        modal:{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
        },
        modalBody:{
            backgroundColor:'#2c3e50',
            padding:15,
            width:width<height?(width*80)/100:(width*50)/100,
            position:'relative',
            marginTop:-100
        },fieldContianer:{
            marginVertical:20,
            paddingLeft:10,
            color:'White',
            height:40,
            justifyContent:'center'
        },label:{
            fontSize:17,
            color:"white",
            fontWeight:"600",
            marginBottom:5
        },input:{
            fontSize:15,
            color:"white",
            backgroundColor:"#576574"
        },btn:{
            paddingHorizontal:20,
            paddingVertical:10,
            color:"white",
            backgroundColor:'green',
            width:"50%",
            fontSize:17,
            textAlign:'center',
            textAlignVertical:'center'
        }
    })
    function handleSubmit(){
        formData = {
            name,number
        }
        const newRef = db.ref("contacts").push();
        newRef.set(formData).then(()=>{
            console.log(formData)
        })
        setName("")
        setNumber("")
        setOpenForm(false)
    }
  return (
    <Modal 
    visible={openForm}
    transparent={true}
    animationType="slide"
    onRequestClose={()=>setOpenForm(false)}
    >
        <View style={styles.modal} >
            <View style={styles.modalBody}>
                <View style={styles.fieldContianer}>
                    <TouchableOpacity onPress={()=>setOpenForm(false)} style={{alignItems:"flex-end"}} activeOpacity={.7}>
                        <Entypo name="cross" size={30} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.label}>Contact name</Text>
                    <TextInput onChangeText={(val)=>setName(val)} style={styles.input} />
                </View>
                <View style={styles.fieldContianer}>
                    <Text style={styles.label}>Contact name</Text>
                    <TextInput onChangeText={(val)=>setNumber(val)} style={styles.input} />
                </View>
                <View style={[styles.fieldContianer,{marginBottom:-1}]}>
                    <TouchableOpacity onPress={()=>handleSubmit()} activeOpacity={.7} >
                        <Text style={styles.btn}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
  )
}

export default ModalForm
