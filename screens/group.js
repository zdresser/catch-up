import React, {useEffect} from 'react';
import { StyleSheet, View, Text,  FlatList, ScrollView } from 'react-native'
import {ListItem, Button} from 'react-native-elements'
import { getGroupAsync } from '../redux/groupSlice'
import { useDispatch, useSelector } from "react-redux";

export default function Group({ route, navigation }) {
  const group = useSelector(state => state.group)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroupAsync(route.params.group))
  }, [])

  const handlePostPress = (id) => {
    navigation.navigate('Post', {post: id})
  }

  const newPostPress = () => {
    navigation.navigate('NewPost', {group: group._id})
  }

  //style entries
  //posts need to include author, , upvote buttons, num comments
  //add infinite scroll
  return (
    

    <View style={styles.container}>
      <FlatList
        data={group.posts}
        keyExtractor={(item)=>item._id}
        renderItem={({ item }) => (
          <ListItem
            bottomDivider
            containerStyle={{
              backgroundColor: '#f7d260',
              width: 200,
              margin: 10,
             
            }}
          onPress={() => handlePostPress(item._id)}
          >
            <ListItem.Content>
            <ListItem.Title>{item.text}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        )} />
      <View style={styles.button}>
        <Button
          title="New Post"
          onPress={newPostPress}
        />
    </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  button: {
    marginBottom: 5
  }
})