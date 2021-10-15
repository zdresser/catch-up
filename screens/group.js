import React, {useEffect} from 'react';
import { StyleSheet, View, Text,   ScrollView, Linking } from 'react-native'
import {ListItem, Button, Icon, Image} from 'react-native-elements'
import { getGroupAsync, editPostVotes, sortPostsByUpvotes } from '../redux/groupSlice'
import { useDispatch, useSelector } from "react-redux";

export default function Group({ route, navigation }) {
  const group = useSelector(state => state.group)
  
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getGroupAsync(route.params.group))
  }, [])

  useEffect(() => {
    dispatch(sortPostsByUpvotes(group.posts))
  }, [group.posts])

  const handlePostPress = (id) => {
    navigation.navigate('Post', {post: id})
  }

  const newPostPress = () => {
    navigation.navigate('NewPost', {group: group._id})
  }
  const handleUpvotePress = (id) => {
    //check for previous vote
    

    //edit vote count
    const post = group.posts.find(({ _id }) => _id === id)
  
    const votes = post.upvotes + 1
    //dispatch update
    dispatch(editPostVotes({
      post: id,
      upvotes: votes
    }))

    //update user to show that they have voted
    
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
      <ScrollView>
        {group.posts.map((post) => {
        
          if (post.link) {
            
          return (
            
            <ListItem
            bottomDivider
            containerStyle={styles.postContainer}
              onPress={() => handlePostPress(post._id)}
            key={post._id}
            >
              
           <Icon
              name='arrow-up'
              type='font-awesome-5'
              color='cornflowerblue'
              onPress={() => handleUpvotePress(post._id)}
              />
              
              <ListItem.Content>
                
                <ListItem.Title>{post.text}</ListItem.Title>
                <ListItem.Subtitle style={{ textDecorationLine: 'underline' }}>Votes: {post.upvotes} {"\n"}</ListItem.Subtitle>
                  
                <ListItem.Subtitle>
                  {post.preview.title}
                </ListItem.Subtitle>
                <ListItem.Subtitle>
                  {post.preview.description.substring(0, 100)}
                </ListItem.Subtitle>
                <Image
                    source={{ uri: post.preview.image }}
                    style={{
                      height: 250,
                      width: 250
                      // this doesn't show up!!!
                    }}
                />

              </ListItem.Content>
              
            <Icon
              name='arrow-down'
              type='font-awesome-5'
              color='cornflowerblue'
              onPress={() => handleDownvotePress(post._id)}
            />
            </ListItem>
           
            
        )
        } else {
          return (
            <ListItem
              bottomDivider
              containerStyle={styles.postContainer}
              onPress={() => handlePostPress(post._id)}
              key={post._id}
            >
           <Icon
              name='arrow-up'
              type='font-awesome-5'
              color='cornflowerblue'
              onPress={() => handleUpvotePress(post._id)}
            />
            <ListItem.Content>
              <ListItem.Title>{post.text}</ListItem.Title>
                <ListItem.Subtitle style={{ textDecorationLine: 'underline' }}>Votes: {post.upvotes} {"\n"}</ListItem.Subtitle>
              
            </ListItem.Content>
            <Icon
              name='arrow-down'
              type='font-awesome-5'
              color='cornflowerblue'
              onPress={() => handleDownvotePress(post._id)}
            />
          </ListItem>
          )
        }
      })}
      </ScrollView>
    
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
  },
  postContainer: {
    backgroundColor: '#f7d260',
    width: 350,
    margin: 10,
    borderRadius: 35,
    
  }
})