import { StyleSheet, Text, View,useWindowDimensions ,TouchableOpacity} from 'react-native'
import React,{useEffect,useState} from 'react'
import { Avatar } from 'native-base'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Entypo from "react-native-vector-icons/Entypo"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import Fontisto from "react-native-vector-icons/Fontisto"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import AntDesign from "react-native-vector-icons/AntDesign"
import { useNavigation } from '@react-navigation/native'
import { firebase } from '@react-native-firebase/database';
import { useRoute } from '@react-navigation/native'

const ContactDetail = () => {
    const {key} = useRoute().params
    const db = firebase.app().database("https://native-app-cca2d-default-rtdb.asia-southeast1.firebasedatabase.app/")
    const {goBack} = useNavigation()
    const [data,setData] = useState({name:"",number:""})
    const {height,width} = useWindowDimensions();
    const styles = StyleSheet.create({
        container:{
            flex:1,
            backgroundColor:'black',
            padding:10,
            paddingBottom:40,
            position:'relative'
        },
        detailContainer:{
            width:height>width?width*.95:width*.50,
            justifyContent:'center',
            alignItems:'center',
            position:'relative',
            marginTop:70,
            backgroundColor:"#2d3436",

        },
        avtar:{
            position:"absolute",
            alignSelf:'center',
            top:-50
        },
        detail:{
            height:230,
        },
        detailText:{
            fontWeight:'bold',
            fontSize:20,
            color:'white',
        },
        detailInfoConainer:{
            alignItems:'center',
            paddingTop:70
        },
        detailAction:{
            flexDirection:'row',
            justifyContent:'space-between',
            marginTop:20
        },
        detailActionItem:{
            backgroundColor:'green',
            padding:10,
            borderRadius:50,
            width:45,
            height:45,
            justifyContent:'center',
            alignItems:'center',
            marginHorizontal:15
        },
        otherApp:{
            paddingVertical:5,
            backgroundColor:"#2d3436",
            marginTop:30,
            marginHorizontal:1,
            borderRadius:10,
        },
        otherAppItem:{
            paddingHorizontal:15,
            paddingVertical:10,
            borderBottomColor:"black",
            borderBottomWidth:1,
            marginVertical:1,
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
        },
        otherAppText:{
            color:'white',
            fontWeight:'bold',
            fontSize:18
        },
    
    })

    useEffect(()=>{
        db.ref("contacts/"+key).once("value").then((snap)=>{
            setData({name:snap.val().name,number:snap.val().number});
        })
    },[])
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={()=>goBack()} style={{marginHorizontal:5,top:0}} activeOpacity={.7}>
            <AntDesign name="left" size={30} color="white" />
        </TouchableOpacity>
      <View style={styles.detailContainer}>
            <Avatar style={styles.avtar} bg="amber.600" size="xl" >
                {String(data.name).toUpperCase()[0]}
            </Avatar>
            <View style={styles.detail}>
                <View style={styles.detailInfoConainer} >
                    <Text style={styles.detailText} >{data.name}</Text>
                    <Text style={styles.detailText} >
                        <Text style={{fontSize:15}}>Number : </Text>
                        {data.number}
                    </Text>
                </View>
                <View style={styles.detailAction}>
                    <View style={styles.detailActionItem}>
                        <FontAwesome name="phone" size={30} color="white" />
                    </View>
                    <View style={styles.detailActionItem}>
                        <Entypo name="message" size={30} color="white" />
                    </View>
                    <View style={styles.detailActionItem}>
                        <FontAwesome5 name="video" size={25} color="white" />
                    </View>
                    <View style={styles.detailActionItem}>
                        <FontAwesome5 name="user-edit" size={23} color="white" />
                    </View>

                </View>
            </View>
      </View>
      <View style={styles.otherApp} >
        <View style={styles.otherAppItem}>
            <Text style={styles.otherAppText} >Whatsapp</Text>
            <View style={[styles.detailActionItem,{width:40,height:40}]}>
                <Fontisto name="whatsapp" size={20} color="white" />
            </View>
        </View>
        <View style={[styles.otherAppItem,{borderBottomWidth:0}]}>
            <Text style={styles.otherAppText} >Telegram</Text>
            <View style={[styles.detailActionItem,{width:40,height:40,backgroundColor:'#32A9E1'}]}>
                <EvilIcons name="sc-telegram" size={23} color="white" />
            </View>
        </View>
      </View>
    </View>
  )
}

export default ContactDetail
