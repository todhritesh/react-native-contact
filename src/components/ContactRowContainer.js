import { View, Text } from 'react-native'
import React from 'react'
import ContactRow from './ContactRow'
import {firebase} from "@react-native-firebase/database"


const ContactRowContainer = () => {
  const [data,setData] = React.useState([])
  const db = firebase.app().database("https://native-app-cca2d-default-rtdb.asia-southeast1.firebasedatabase.app/")
function getData(){
  const ref = db.ref("contacts");
  ref.on("value",snap=>{
    let arr = []
    snap.forEach(item=>{
      arr.push({...item.val(),id:item.key});
    })
    setData(arr)
  })
}
React.useEffect(()=>{
  getData()
},[])
  return (
    <View
    style={{
        padding:5,
        width:'100%',
        backgroundColor:"#2d3436",
        borderRadius:20,
        marginTop:20,
        paddingBottom:300
    }}
    >
      {
        data.map(item=>(
          <ContactRow key={item.id} name={item.name} />
        ))
      }
    </View>
  )
}

export default ContactRowContainer




























// import { View, Text , StyleSheet,Dimensions,Animated} from 'react-native'
// import React from 'react'
// import ContactRow from './ContactRow'
// import {firebase} from "@react-native-firebase/database"
// import { SwipeListView } from 'react-native-swipe-list-view';


// const ContactRowContainer = () => {
//   const rowTranslateAnimatedValues = {};
// Array(20)
//     .fill('')
//     .forEach((_, i) => {
//         rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
//     });
//   const [listData,setListData] = React.useState([])
//   const db = firebase.app().database("https://native-app-cca2d-default-rtdb.asia-southeast1.firebasedatabase.app/")
// function getData(){
//   const ref = db.ref("contacts");
//   ref.on("value",snap=>{
//     let arr = []
//     snap.forEach(item=>{
//       arr.push({...item.val(),id:item.key});
//     })
//     setListData(arr)
//   })
// }
// React.useEffect(()=>{
//   getData()
// },[])


// const onSwipeValueChange = swipeData => {
//   const { key, value } = swipeData;
//   if (
//       value < -Dimensions.get('window').width &&
//       !this.animationIsRunning
//   ) {
//       this.animationIsRunning = true;
//       Animated.timing(rowTranslateAnimatedValues[key], {
//           toValue: 0,
//           duration: 200,
//       }).start(() => {
//           const newData = [...listData];
//           const prevIndex = listData.findIndex(item => item.key === key);
//           newData.splice(prevIndex, 1);
//           setListData(newData);
//           this.animationIsRunning = false;
//       });
//   }
// };

// const renderItem = data => (
//   <Animated.View
//       style={[
//           styles.rowFrontContainer,
//           {
//               height: rowTranslateAnimatedValues[
//                   data.item.key
//               ].interpolate({
//                   inputRange: [0, 1],
//                   outputRange: [0, 50],
//               }),
//           },
//       ]}
//   >
//       <TouchableHighlight
//           onPress={() => console.log('You touched me')}
//           style={styles.rowFront}
//           underlayColor={'#AAA'}
//       >
//           <View>
//             <ContactRow key={item.id} name={item.name} />
//           </View>
//       </TouchableHighlight>
//   </Animated.View>
// );


// const renderHiddenItem = () => (
//   <View style={styles.rowBack}>
//       <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
//           <Text style={styles.backTextWhite}>Delete</Text>
//       </View>
//   </View>
// );




// return (
//     <View
//     style={{
//         padding:5,
//         width:'100%',
//         backgroundColor:"#2d3436",
//         borderRadius:20,
//         marginTop:20,
//         paddingBottom:300
//     }}
//     >
//               <View style={styles.container}>
//             <SwipeListView
//                 disableRightSwipe
//                 data={listData}
//                 renderItem={renderItem}
//                 renderHiddenItem={renderHiddenItem}
//                 rightOpenValue={-Dimensions.get('window').width}
//                 previewRowKey={'0'}
//                 previewOpenValue={-40}
//                 previewOpenDelay={3000}
//                 onSwipeValueChange={onSwipeValueChange}
//                 useNativeDriver={false}
//             />
//         </View>
//     </View>
//   )
// }

// export default ContactRowContainer

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     flex: 1,
// },
// backTextWhite: {
//     color: '#FFF',
// },
// rowFront: {
//     alignItems: 'center',
//     backgroundColor: '#CCC',
//     borderBottomColor: 'black',
//     borderBottomWidth: 1,
//     justifyContent: 'center',
//     height: 50,
// },
// rowBack: {
//     alignItems: 'center',
//     backgroundColor: 'red',
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingLeft: 15,
// },
// backRightBtn: {
//     alignItems: 'center',
//     bottom: 0,
//     justifyContent: 'center',
//     position: 'absolute',
//     top: 0,
//     width: 75,
// },
// backRightBtnRight: {
//     backgroundColor: 'red',
//     right: 0,
// },
// })