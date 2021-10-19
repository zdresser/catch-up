
import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, Linking,TouchableWithoutFeedback, Keyboard, ScrollView, KeyboardAvoidingView } from 'react-native'
import {Card, ListItem, Button, Input, Icon} from 'react-native-elements'
import { useDispatch, useSelector } from "react-redux";
import { getPostAsync, addComment } from '../redux/postSlice'
import socket from '../socket-connect' //actually being used despite grey


export default function Post({ navigation, route }) {
  //use deep linking to launch link in appropriate app 
  
  const [newCommentText, setNewCommentText] = useState('');
  const user = useSelector(state => state.user)
  const post = useSelector(state => state.post);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getPostAsync(route.params.post))    
  }, [])

  const generateComments = () => {
   

    return (
      post.comments.map(comment => {
        return (
          <ListItem
            bottomDivider
            containerStyle={styles.commentContainer}
            key={comment._id}
          >
            <Text>{comment.author.userName}: {comment.text} </Text>
            
          </ListItem>
        )
      })
    )
  }

  const submitComment = () => {
    if (!newCommentText) {
      return alert("Enter a comment first")
    }

    dispatch(addComment({
      author: user._id,
      post: post._id,
      text: newCommentText
    }))

    setNewCommentText('');
    Keyboard.dismiss()
  }

  const commentInput = () => {

    return (
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
        }}>
      <View style={styles.newCommentContainer}>
          <Input
          value={newCommentText}
          placeholder='Add a comment'
          onChangeText={text => setNewCommentText(text)}
          rightIcon={
            <Icon
            type= 'font-awesome-5'
            name= 'paper-plane'
            onPress={() => submitComment()}
          />
          }
        />
        </View>
        </TouchableWithoutFeedback>
    )
  }

  if (post.link) {
    
    return (
      
      <KeyboardAvoidingView style={styles.container}>
        <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
        }}>
        <View style={styles.inner} >
       
        <Card
          containerStyle={styles.post}
        >
          <Card.Title>{post.preview.description.substring(0,200)}</Card.Title>
          <Text>{post.preview.title}</Text>
          
              { post.preview.image !== "https://abs.twimg.com/responsive-web/client-web/icon-ios.8ea219d5.png" && <Card.Image
                source={{ uri: post.preview.image }}
                style={{ height: 200 }}
                onPress={() => Linking.openURL(post.preview.url)}
              />}
        </Card>
        <ScrollView style={styles.chatContainer}>
          {generateComments()}
        </ScrollView>
        {commentInput()}
      
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
       
 
    )
  } else {
    return (
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
        }}>
        <View style={styles.container}>
          
          <Card
            containerStyle={styles.post}
          >
            <Card.Title>{post.text}</Card.Title>
        </Card>
        <ScrollView style={styles.chatContainer}>
            {generateComments()}
           
        </ScrollView>
       {commentInput()}
       
      </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#9D9D9D'
  },
  chatContainer: {
    flex: 2,
    padding: 20,
    width: 350,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 5,
   
    backgroundColor: "#F8F0DF"
  },
  commentContainer: {
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#79B4B7'
  },
  newCommentContainer: {
    marginBottom: 5,
    width: 350,
    borderRadius: 5,
    backgroundColor: "#F8F0DF"
  },
  post: {
    backgroundColor: '#FEFBF3',
    borderRadius: 5,
    width: 350
  },
  inner: {
    padding: 24,
    flex: 1,
    alignItems:'center',
    justifyContent: "flex-end",
},
})