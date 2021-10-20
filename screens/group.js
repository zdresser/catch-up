import React, {useEffect} from 'react';
import { StyleSheet, View, Text,   ScrollView, Linking } from 'react-native'
import {ListItem, Button, Icon, Image} from 'react-native-elements'
import { getGroupAsync, editPostVotes, sortPostsByUpvotes } from '../redux/groupSlice'
import {addUserVoteAsync, editUserVoteAsync} from '../redux/userSlice'
import { useDispatch, useSelector } from "react-redux";


export default function Group({ route, navigation }) {
  const group = useSelector(state => state.group)
  const user = useSelector(state => state.user)
 
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getGroupAsync(route.params.group))
  }, [])

  useEffect(() => {
    dispatch(sortPostsByUpvotes(group.posts))
  }, [group.posts])

  const addUserPress = () => {
    navigation.navigate('AddUserToGroup', {group: group._id})
  }
  const handlePostPress = (id) => {
    navigation.navigate('Post', {post: id})
  }

  const newPostPress = () => {
    navigation.navigate('NewPost', {group: group._id})
  }

  const handleUpvotePress = (id) => {
    
    //check for previous vote
    if (user.voteRecord.some(record => record.post === id)) {
      //find obj in voteRecord array
      const postVoteRecord = user.voteRecord.find(record => record.post === id);
      //check to see if vote === 1
      if (postVoteRecord.vote === 1) {
        return alert("You've already upvoted this post")
      }
      dispatch(editUserVoteAsync({
        user: user._id,
        post: id,
        vote: postVoteRecord.vote + 1
      }))
    } else {
      //dispatch addUserVoteAsync
      dispatch(addUserVoteAsync({
        user: user._id,
        post: id,
        vote: 1
      }))
    }
   
    const post = group.posts.find(({ _id }) => _id === id)
  
    const votes = post.upvotes + 1
    //dispatch update
    dispatch(editPostVotes({
      post: id,
      upvotes: votes
    }))
  }

  const handleDownvotePress = (id) => {
    if (user.voteRecord.some(record => record.post === id)) {
      //find obj in voteRecord array
      const postVoteRecord = user.voteRecord.find(record => record.post === id);
      //check to see if vote === 1
      if (postVoteRecord.vote === -1) {
        return alert("You've already downvoted this post")
      }
      
      //dispatch editUserVoteAsync
      dispatch(editUserVoteAsync({
        user: user._id,
        post: id,
        vote: postVoteRecord.vote - 1
      }))
    } else {
      //dispatch addUserVoteAsync
      dispatch(addUserVoteAsync({
        user: user._id,
        post: id,
        vote: -1
      }))
    }
    const post = group.posts.find(({ _id }) => _id === id)
  
    const votes = post.upvotes - 1
    
    dispatch(editPostVotes({
      post: id,
      upvotes: votes
    }))
  }

  const toggleAddUser = () => {
    setVisible(!visible)
  }
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
                <ListItem.Subtitle >Votes: {post.upvotes} Posted by {post.author.userName}{"\n"}</ListItem.Subtitle>
                  
                <ListItem.Subtitle>
                  {post.preview.title}
                </ListItem.Subtitle>
                <ListItem.Subtitle>
                  {post.preview.description.substring(0, 100)}
                </ListItem.Subtitle>
{/* Edit image so that the generic twitter one doesnt show? */}
                { post.preview.image !== "https://abs.twimg.com/responsive-web/client-web/icon-ios.8ea219d5.png" && <Image
                  source={{ uri: post.preview.image }}
                  style={{
                    height: 250,
                    width: 250
                  }}
                />}

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
                <ListItem.Subtitle >Votes: {post.upvotes}  Posted by {post.author.userName} {"\n"}</ListItem.Subtitle>
              
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
        <View style={styles.bottomButton}>
        <Button
          title="New Post"
          titleStyle={{color: '#79B4B7'}}
          buttonStyle={styles.button}
          onPress={() => newPostPress()}
          />
        </View>
        <View >
        <Button
          title="Add user to group"
          titleStyle={{color: '#79B4B7'}}
          buttonStyle={styles.button}
          onPress={() => addUserPress()}
          />
          </View>
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
    margin: 5,
    flex: 0,
    flexDirection: 'row',
  },
  bottomButton: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginRight: 20
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