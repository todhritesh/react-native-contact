import { View, Text , StyleSheet,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import EntypoIcons from "react-native-vector-icons/Entypo"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import ModalForm from './ModalForm'

const ActionRow = () => {
  const [openForm,setOpenForm] = useState(false)

    const styles = StyleSheet.create({
        container:{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            paddingBottom:20,
            width:'100%',
            backgroundColor:'#000000'
        },
        left:{

        },
        right:{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
        },rightIcon:{
            marginHorizontal:10
        }
    })
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity>
          <EntypoIcons name="menu" size={28} color="white"/>
        </TouchableOpacity>
      </View>
      <View style={styles.right}>
        <TouchableOpacity onPress={()=>setOpenForm(true)} >
          <EntypoIcons style={styles.rightIcon} name="plus" size={28} color="white"/>
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome style={styles.rightIcon} name="search" size={22} color="white"/>
        </TouchableOpacity>
        <TouchableOpacity>
          <EntypoIcons style={styles.rightIcon} name="dots-three-vertical" size={22} color="white"/>
        </TouchableOpacity>
      </View>
      <ModalForm openForm={openForm} setOpenForm={setOpenForm} />
    </View>
  )
}

export default ActionRow