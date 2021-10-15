import React from 'react';
import { StyleSheet, View,  Text, FlatList, ScrollView, Platform } from 'react-native'
import {  Button, ListItem, Badge } from 'react-native-elements';
import {useSelector} from 'react-redux'



export default function Home({navigation}) {
  //add logic to toggle between login/signup and group view
  const user = useSelector(state => state.user)

  const handleGroupPress = (id) => {
    //navigate to group by that id. pass id in props
    navigation.navigate('Group', {group: id})
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
        {/* button to create new group */}
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
    borderRadius: 35,
  }
})