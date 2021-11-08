import React from 'react';
import { StyleSheet, View,  Text, FlatList, ScrollView, Platform } from 'react-native'
import {  Button, ListItem } from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux'
import {logout} from '../redux/userSlice'


export default function Home({navigation}) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleGroupPress = (id) => {
    //navigate to group by that id. pass id in props
    navigation.navigate('Group', {group: id})
  }

  const newGroupPress = () => {
    navigation.navigate('NewGroup', {user: user._id})
  }

  const logoutPress = () => {
    dispatch(logout())
  }
 
  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>My Groups</Text>
      <View style={styles.container}>
        {
          user.groups.map((item, index) => {
            return (
              <ListItem
                key={index}
                bottomDivider
                onPress={() => handleGroupPress(item._id)}
                containerStyle={styles.listItem}
              >
                <ListItem.Title
                  style={{color: '#FEFBF3'}}
                >{item.title}</ListItem.Title>
            </ListItem>
            )
          })
        }
      </View>
      <View style={styles.bottomButton}>
      <Button
          title="New Group"
          titleStyle={{ color: '#79B4B7' }}
          containerStyle={{margin: 5}}
          buttonStyle={styles.button}
          onPress={() => newGroupPress()}
      />
      
      <Button
          title="Logout"
          titleStyle={{ color: '#79B4B7' }}
          containerStyle={{margin: 5}}
          buttonStyle={styles.button}
          onPress={() => logoutPress()}
        />
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  
  container: {
    paddingTop: 40,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#9D9D9D',
  },
  title: {
    color: '#FEFBF3',
    fontSize: 20,
    fontWeight: 'bold'
  },
  listItem: {
    backgroundColor: '#79B4B7',
    borderRadius: 20,
    margin: 5,
    width: 200,
    alignItems: 'center'  
  },
  button: {
    backgroundColor: '#FEFBF3',
    
  },
  bottomButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginRight: 20
  },
})