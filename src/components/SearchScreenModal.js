import { StyleSheet, Text, View , Modal ,TouchableOpacity, useWindowDimensions , TextInput } from 'react-native'
import React,{useState} from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import {firebase} from "@react-native-firebase/database"
import SearchContactContainer from './SearchContactContainer'
import {KeyboardAvoidingView } from 'react-native'

const SearchScreenModal = ({openSearch,setOpenSearch}) => {
    const db = firebase.app().database("https://native-app-cca2d-default-rtdb.asia-southeast1.firebasedatabase.app/")
    const {height,width} = useWindowDimensions()
    const [listData,setListData] = useState([]);
    const [tempData,setTempData] = useState([])

    const styles = StyleSheet.create({
        modal:{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
        },
        modalBody:{
            flex:1,
            backgroundColor:'black',
            padding:15,
            width:width<height?width:(width*50)/100,
            position:'relative',
        },header:{
            justifyContent:'space-between',
            marginVertical:5,
            paddingRight:10,
            color:'White',
            flexDirection:'row',
            alignItems:'center',

        },label:{
            fontSize:17,
            color:"white",
            fontWeight:"600",
        },input:{
            fontSize:15,
            color:"white",
            backgroundColor:"#576574",
            width:"90%",
            marginRight:10
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

    function handleSearch(value){
        if(value==""){
            setListData(tempData)
        }else{
            const filterData = listData.filter(item=>{
                if(item.title.toLowerCase().includes(value.toLowerCase())){
                    return item;
                }
            })
            setListData(filterData)
        }
    }
  return (
//     <KeyboardAvoidingView
//     behavior="padding"
//     enabled={false}
//     style={{flex:1}}
//   >
    <Modal 
    visible={openSearch}
    // transparent={true}
    animationType="slide"
    onRequestClose={()=>setOpenSearch(false)}
    >
        <View style={styles.modal} >
            <View style={styles.modalBody}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=>setOpenSearch(false)} style={{marginHorizontal:5}} activeOpacity={.7}>
                        <AntDesign name="left" size={30} color="white" />
                    </TouchableOpacity>
                    <TextInput onChangeText={(val)=>handleSearch(val)} style={styles.input} />
                </View>
                <SearchContactContainer tempData={tempData} setTempData={setTempData} listData={listData} setListData={setListData} />
            </View>
        </View>
    </Modal>
    // </KeyboardAvoidingView>
  )
}

export default SearchScreenModal
