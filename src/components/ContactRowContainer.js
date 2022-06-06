import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
  useWindowDimensions,
  ScrollView
} from 'react-native';
import EditModal from './EditModal';
import { Avatar} from "native-base";
import { firebase } from '@react-native-firebase/database';
import {SwipeListView} from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const NotificationScreen = () => {
  const {navigate} = useNavigation()
  const [editName,setEditName] = useState("");
  const [editNumber , setEditNumber] = useState("");
  const [editKey , setEditKey] = useState("");
  const [openEdit,setOpenEdit] = useState(false)
  const {height,width} = useWindowDimensions();
  const db = firebase.app().database("https://native-app-cca2d-default-rtdb.asia-southeast1.firebasedatabase.app/")
  const [listData, setListData] = useState([]);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f4f4f4',
      backgroundColor: 'red',
      flex: 1,
      marginTop:10,
      paddingBottom:height
    },
    backTextWhite: {
      color: '#FFF',
    },
    rowFront: {
      backgroundColor: '#FFF',
      borderRadius: 5,
      height: 60,
      marginVertical: 5,
      marginBottom: .1,
      shadowColor: '#999',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
      borderRadius:50,
    },
    rowFrontVisible: {
      backgroundColor: '#FFF',
      borderRadius: 5,
      height: 60,
      padding: 10,
      marginBottom: 15,
    },
    rowBack: {
      alignItems: 'center',
      backgroundColor: "black",
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 15,
      margin: 5,
      marginBottom: 15,
      borderRadius: 5,
      height:60,
    },
    backRightBtn: {
      alignItems: 'flex-end',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 75,
      paddingRight: 17,
      height:60
    },
    backRightBtnLeft: {
      backgroundColor: '#1f65ff',
      right: 75,
    },
    backRightBtnRight: {
      backgroundColor: 'red',
      right: 0,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
    },
    trash: {
      height: 25,
      width: 25,
      marginRight: 7,
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#666',
      marginLeft:20,
    },
    details: {
      fontSize: 12,
      color: '#999',
    },
  });

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  useEffect(()=>{
    const ref = db.ref("contacts");
    ref.on("value",snap=>{
      let arr = []
      snap.forEach(item=>{
        arr.push({...item.val(),id:item.key});
      })

      arr.sort((a, b) => a.name.localeCompare(b.name))

      setListData(
        arr.map((item, index) => ({
          key: `${item.id}`,
          title: item.name,
          details: item.number,
        })),
      );
    })
},[])

const deleteRow = (rowMap, rowKey) => {
  closeRow(rowMap, rowKey);
  const newData = [...listData];
  const prevIndex = listData.findIndex(item => item.key === rowKey);
  newData.splice(prevIndex, 1);
  setListData(newData);
  db.ref(`contacts/${rowKey}`).remove().then(()=>console.log("deleted from db"));
};

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  const onLeftActionStatusChange = rowKey => {
    console.log('onLeftActionStatusChange', rowKey);
  };

  const onRightActionStatusChange = rowKey => {
    console.log('onRightActionStatusChange', rowKey);
  };

  const onRightAction = rowKey => {
    console.log('onRightAction', rowKey);
  };

  const onLeftAction = rowKey => {
    console.log('onLeftAction', rowKey);
  };

  function handleEditForm( rowKey){
    
    setOpenEdit(true)
    db.ref("contacts/"+rowKey).once("value").then(snap=>{
      setEditNumber(snap.val().number)
      setEditName(snap.val().name);
      setEditKey(snap.key);
    })
  }

  const VisibleItem = props => {
    const {data,rowHeightAnimatedValue,removeRow,leftActionState,rightActionState,} = props;
    if (rightActionState) {
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        removeRow();
      });
    }

    return (
      <Animated.View
        style={[styles.rowFront, {height: rowHeightAnimatedValue}]}>
        <TouchableHighlight style={[styles.rowFrontVisible,{backgroundColor:'#2d3436'}]} onPress={() => navigate("contactDetail",{key:data.item.key})} underlayColor={'#aaa'} >
          <View style={{flexDirection:'row',alignItems:'center',}} >
          <Avatar bg="#EE5A24" size={35} >
            {String(data.item.title).toUpperCase()[0]}
          </Avatar>
            <Text style={[styles.title,{color:'white',fontWeight:"700",fontSize:18}]} numberOfLines={1}>
              {data.item.title}
            </Text>
          </View>
        </TouchableHighlight>
      </Animated.View>
    );
  };

  const renderItem = (data, rowMap) => {
    const rowHeightAnimatedValue = new Animated.Value(60);
    return (
      <VisibleItem data={data} rowHeightAnimatedValue={rowHeightAnimatedValue} removeRow={() => deleteRow(rowMap, data.item.key)} />
    );
  };

  const HiddenItemWithActions = props => {
    const {handleEditForm,swipeAnimatedValue,leftActionActivated,rightActionActivated,rowActionAnimatedValue,rowHeightAnimatedValue,onClose,onDelete,} = props;

    if (leftActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: width,
        useNativeDriver: false
      }).start(()=>{handleEditForm();onClose()});
    } 
    else if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: width,
        useNativeDriver: false
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 75,
        useNativeDriver: false
      }).start();
    }
    return (
      <Animated.View style={[styles.rowBack, {height: rowHeightAnimatedValue}]}>
        {!rightActionActivated && (
          <Animated.View
            style={{  
                alignItems: 'flex-start',
                bottom: 0,
                justifyContent: 'center',
                position: 'absolute',
                top: 0,
                width: rowActionAnimatedValue,
                paddingRight: 17,
                flex: 1,
                paddingLeft:20,
                height:60,
                backgroundColor:'green',
                justifyContent:'center',
                position:'absolute',
                left:0,
                backgroundColor:'green'
              }}>
            <TouchableOpacity
              style={{
                alignItems: 'flex-start',
                bottom: 0,
                justifyContent: 'center',
                position: 'absolute',
                top: 0,
              }}
              onPress={handleEditForm}>
              <Animated.View
                style={[
                  {
                    paddingLeft:15,
                    alignItems:'flex-start',
                    backgroundColor:'green',
                    transform: [
                      {
                        scale: swipeAnimatedValue.interpolate({
                          inputRange: [0, 10],
                          outputRange: [0, 1],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  },
                ]}>
                <Entypo
                  name="edit"
                  size={25}
                  color="#fff"
                />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        )}
        {!leftActionActivated && (
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={onClose}>
            <MaterialCommunityIcons
              name="close-circle-outline"
              size={25}
              style={styles.trash}
              color="#fff"
            />
          </TouchableOpacity>
        )}
        {!leftActionActivated && (
          <Animated.View
            style={[
              styles.backRightBtn,
              styles.backRightBtnRight,
              {
                flex: 1,
                width: rowActionAnimatedValue,
              },
            ]}>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={onDelete}>
              <Animated.View
                style={[
                  styles.trash,
                  {
                    transform: [
                      {
                        scale: swipeAnimatedValue.interpolate({
                          inputRange: [-90, -45],
                          outputRange: [1, 0],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  },
                ]}>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={25}
                  color="#fff"
                />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <HiddenItemWithActions handleEditForm={()=>handleEditForm(data.item.key)} data={data} rowMap={rowMap} rowActionAnimatedValue={rowActionAnimatedValue} rowHeightAnimatedValue={rowHeightAnimatedValue} onClose={() => closeRow(rowMap, data.item.key)} onDelete={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  return (
    <View style={[styles.container,{backgroundColor:"black",flex:1}]}>
      <StatusBar barStyle="dark-content"/>
      {/* <StatusBar backgroundColor="#FF6347" barStyle="light-content"/> */}
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
        onRowDidOpen={onRowDidOpen}
        leftActivationValue={100}
        rightActivationValue={-200}
        leftActionValue={0}
        rightActionValue={-500}
        onLeftAction={onLeftAction}
        onRightAction={onRightAction}
        onLeftActionStatusChange={onLeftActionStatusChange}
        onRightActionStatusChange={onRightActionStatusChange}
      />
    <EditModal editKey={editKey} editName={editName} editNumber={editNumber} setEditName={setEditName} setEditKey={setEditKey} setEditNumber={setEditNumber}  openForm={openEdit} setOpenForm={setOpenEdit} />
    </View>
  );
};

export default NotificationScreen;
