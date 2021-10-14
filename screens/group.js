import React, {useEffect} from 'react';
import { StyleSheet, View, Text,  FlatList, ScrollView } from 'react-native'
import {ListItem, Button, Icon} from 'react-native-elements'
import { getGroupAsync, editPostVotes } from '../redux/groupSlice'
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
  const handleUpvotePress = (id) => {
    //edit vote count
    const post = group.posts.find(({ _id }) => _id === id)
  
    const votes = post.upvotes + 1
    //dispatch update
    dispatch(editPostVotes({
      post: id,
      upvotes: votes
    }))

    //figure out how to allow only one upvote or downvote...
  }

  const handleDownvotePress = (id) => {
    const post = group.posts.find(({ _id }) => _id === id)
  
    const votes = post.upvotes - 1
    
    dispatch(editPostVotes({
      post: id,
      upvotes: votes
    }))
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
              width: 250,
              margin: 10,
              borderRadius:35
             
            }}
            onPress={() => handlePostPress(item._id)}
          >
           <Icon
              name='arrow-up'
              type='font-awesome-5'
              color='cornflowerblue'
              onPress={() => handleUpvotePress(item._id)}
            />
            <ListItem.Content>
              <ListItem.Title>{item.text}</ListItem.Title>
              <ListItem.Subtitle>{item.upvotes}</ListItem.Subtitle>
              
            </ListItem.Content>
            <Icon
              name='arrow-down'
              type='font-awesome-5'
              color='cornflowerblue'
              onPress={() => handleDownvotePress(item._id)}
            />
          </ListItem>
         
        )} />
      <View style={styles.button}>
        <Button
          title="New Post"
          onPress={() => newPostPress()}
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