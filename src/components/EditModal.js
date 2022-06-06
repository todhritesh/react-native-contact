import { StyleSheet, Text, View , Modal ,TouchableOpacity, useWindowDimensions , TextInput } from 'react-native'
import React,{useState} from 'react'
import Entypo from "react-native-vector-icons/Entypo"
import {firebase} from "@react-native-firebase/database"

const EditModal = ({openForm,setOpenForm,setEditName,setEditNumber,setEditKey,editName,editNumber,editKey}) => {
    const db = firebase.app().database("https://native-app-cca2d-default-rtdb.asia-southeast1.firebasedatabase.app/")
    const {height,width} = useWindowDimensions()
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
            marginVertical:5,
            paddingLeft:10,
            color:'White',
            justifyContent:'center'
        },label:{
            fontSize:17,
            color:"white",
            fontWeight:"600",
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
            name:editName,number:editNumber
        }
        const newRef = db.ref("contacts/"+editKey)
        newRef.update(formData).then(()=>{
            console.log(formData)
        })
        setEditName("")
        setEditNumber("")
        setEditKey("")
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
                    <TouchableOpacity onPress={()=>{setOpenForm(false);setEditKey("");setEditName("");setEditNumber("")}} style={{alignItems:"flex-end"}} activeOpacity={.7}>
                        <Entypo name="cross" size={30} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.label}>Contact name</Text>
                    <TextInput onChangeText={(val)=>setEditName(val)} value={editName} style={styles.input} />
                </View>
                <View style={styles.fieldContianer}>
                    <Text style={styles.label}>Phone number</Text>
                    <TextInput onChangeText={(val)=>setEditNumber(val)} value={editNumber} style={styles.input} />
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

export default EditModal
