import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
  useWindowDimensions
} from 'react-native';

import {SwipeListView} from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { firebase } from '@react-native-firebase/database';
import ContactRow from './ContactRow';
import EditModal from './EditModal';


const ContactRowContainer = ({navigation}) => {
  const [editName,setEditName] = useState("");
  const [editNumber , setEditNumber] = useState("");
  const [editKey , setEditKey] = useState("");
  const [openEdit,setOpenEdit] = useState(false)
  const [showNumber,setShowNumber] = useState({key:"",status:false});
  const db = firebase.app().database("https://native-app-cca2d-default-rtdb.asia-southeast1.firebasedatabase.app/")
  const [listData, setListData] = useState([]);
  const {height,width} = useWindowDimensions()
  
  const styles = StyleSheet.create({
      container: {
        padding:5,
        width:'100%',
        backgroundColor:"#2d3436",
        borderRadius:20,
        marginTop:20,
        height:height+height*40/100 ,
      },
      rowFront: {
        backgroundColor: '#2d3436',
      },
      rowFrontVisible: {
      },
      rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        margin: 5,
        marginBottom: 15,
        borderRadius: 5,
      },
      backRightBtn: {
        alignItems: 'flex-end',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        paddingRight: 17,
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
      }
    });

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

  function closeRow (rowMap, rowKey) {
    // console.log("close row",rowMap[rowKey])
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const handleEditForm = (rowMap , rowKey) => {
    console.log(rowKey)
    setOpenEdit(true)
    
    db.ref("contacts/"+rowKey).once("value").then(snap=>{
      setEditNumber(snap.val().number)
      setEditName(snap.val().name);
      setEditKey(snap.key);
    })
  }

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
    handleEditForm(null,rowKey)
    console.log('onLeftAction', rowKey);
  };

  const VisibleItem = props => {
    const {
      data,
      rowHeightAnimatedValue,
      removeRow,
      leftActionState,
      rightActionState,
    } = props;

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
        <TouchableOpacity activeOpacity={.6}
          style={styles.rowFrontVisible}
          onPress={() => setShowNumber({key:data.item.key,status:!showNumber.status})}
          underlayColor={'#aaa'}>
          <ContactRow showNumber={showNumber} id={data.item.key} number={data.item.details} name={data.item.title} />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderItem = (data, rowMap) => {
    const rowHeightAnimatedValue = new Animated.Value(60);
    console.log("row map",rowMap)
    return (
      <VisibleItem
        data={data}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        removeRow={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  const HiddenItemWithActions = props => {
    const {
      swipeAnimatedValue,
      leftActionActivated,
      rightActionActivated,
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      onClose,
      onDelete,
      handleEditForm
    } = props;

    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 500,
        useNativeDriver: false
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 75,
        useNativeDriver: false
      }).start();
    }

    if (leftActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 500,
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
        {!rightActionActivated &&
        <TouchableOpacity
          style={[styles.backRightBtn,{backgroundColor:'green'}]}
          onPress={handleEditForm}>
          <FontAwesome5
            name="edit"
            size={22}
            style={styles.trash}
            color="white"
          />
        </TouchableOpacity>
        }
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
                backgroundColor:'red'
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
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onClose={() => closeRow(rowMap, data.item.key)}
        onDelete={() => deleteRow(rowMap, data.item.key)}
        handleEditForm={() => handleEditForm(rowMap, data.item.key)}
      />
    );
  };

  return (
    <View style={styles.container}>
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

export default ContactRowContainer;

