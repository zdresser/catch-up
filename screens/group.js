import React, {useEffect} from 'react';
import { StyleSheet, View, Text,   ScrollView, Linking } from 'react-native'
import {ListItem, Button, Icon, Image} from 'react-native-elements'
import { getGroupAsync, editPostVotes, sortPostsByUpvotes } from '../redux/groupSlice'
import {editVotesAsync} from '../redux/userSlice'
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
    // const userVotes = user.voteRecord.find()
    //alert user that vote has happened
    //edit vote count
    const post = group.posts.find(({ _id }) => _id === id)
  
    const votes = post.upvotes + 1
    //dispatch update
    dispatch(editPostVotes({
      post: id,
      upvotes: votes
    }))

    //update user to show that they have voted
    //dispatch(editVotesAsync({user=user._id, post: id, votes: votes}))
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
              color="#F8F0DF"
              onPress={() => handleUpvotePress(post._id)}
              />
              
              <ListItem.Content>
                
                <ListItem.Title
                  style={styles.title}
                >{post.text}</ListItem.Title>
                <ListItem.Subtitle >Votes: {post.upvotes} Posted by {post.authorName}{"\n"}</ListItem.Subtitle>
                  
                <ListItem.Subtitle>
                  {post.preview.title}
                </ListItem.Subtitle>
                <ListItem.Subtitle>
                  {post.preview.description.substring(0, 100)}
                </ListItem.Subtitle>
{/* Edit image so that the generic twitter one doesnt show? */}
                <Image
                    source={{ uri: post.preview.image }}
                    style={{
                      height: 250,
                      width: 250
                    }}
                />

              </ListItem.Content>
              
            <Icon
              name='arrow-down'
              type='font-awesome-5'
              color="#F8F0DF"
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
              color="#F8F0DF"
              onPress={() => handleUpvotePress(post._id)}
            />
            <ListItem.Content>
                <ListItem.Title
                  style={styles.title}
                >{post.text}</ListItem.Title>
                <ListItem.Subtitle >Votes: {post.upvotes}  Posted by {post.authorName}{"\n"}</ListItem.Subtitle>
              
            </ListItem.Content>
            <Icon
              name='arrow-down'
              type='font-awesome-5'
              color="#F8F0DF"
              onPress={() => handleDownvotePress(post._id)}
            />
          </ListItem>
          )
        }
      })}
      </ScrollView>
    
      <View style={styles.buttonContainer}>
        <Button
          title="New Post"
          titleStyle={{color: '#79B4B7'}}
          buttonStyle={styles.button}
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
    backgroundColor: '#9D9D9D'
  },
  button: {
    backgroundColor: '#FEFBF3',
    
  },
  buttonContainer: {
    margin: 5
  },
  postContainer: {
    backgroundColor: '#79B4B7',
    width: 350,
    margin: 10,
    borderRadius: 35,
  },
  title: {
    color: '#FEFBF3',
  }
})