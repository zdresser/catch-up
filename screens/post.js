
import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, Linking,TouchableWithoutFeedback, Keyboard, ScrollView, FlatList, KeyboardAvoidingView } from 'react-native'
import {Card, ListItem, Button, Input, Icon} from 'react-native-elements'
import { useDispatch, useSelector } from "react-redux";
import { getPostAsync, addComment } from '../redux/postSlice'
import socket from '../socket-connect' //actually being used despite grey

//for future feedback from mazen create a pull request on my branch and invite him then share link in Slack
// <Wrapper item={item}>{...commentInput()...}</Wrapper>
// const Wrapper = ({item, children}) => (
//   item.link ? <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback> : <View>{children}</View>
// );

export default function Post({ navigation, route }) {
  //use deep linking to launch link in appropriate app 
  
  const [newCommentText, setNewCommentText] = useState('');
  const user = useSelector(state => state.user)
  const post = useSelector(state => state.post);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getPostAsync(route.params.post))    
  }, [])

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

  const CommentInput = () => {
//when used as a component this causes funky problems with the keyboard. why??
    return (
      <View style={styles.newCommentContainer}>
          <Input
          value={newCommentText}
          placeholder='Add a comment'
          onChangeText={text => setNewCommentText(text)}
          rightIcon={
            <Icon
            type= 'font-awesome-5'
            name= 'paper-plane'
            onPress={submitComment}
            />
          }
        />
      </View>
    )
  }

  const CommentListItem = ({ item }) => {
    return (
      <ListItem
      bottomDivider
      containerStyle={styles.commentContainer}
      key={item._id}
    >
      <ListItem.Subtitle >{item.author.userName}</ListItem.Subtitle>
      <ListItem.Title>{item.text}</ListItem.Title>
      
    </ListItem>
    ) 
  }

  if (post.link) {
    
    return (
      
      <KeyboardAvoidingView
        onPress={() => {
        Keyboard.dismiss();
        }}
        style={styles.container}
      >
        
        <View style={styles.inner} >
       
        <Card
          containerStyle={styles.post}
        >
          <Card.Title>{post.preview.description.substring(0,200)}</Card.Title>
          <Text>{post.preview.title}</Text>
          
              { post.preview.image !== "https://abs.twimg.com/responsive-web/client-web/icon-ios.8ea219d5.png" && <Card.Image
                source={{ uri: post.preview.image }}
                // style={{ height: '50%' }}
                onPress={() => Linking.openURL(post.preview.url)}
              />}
        </Card>
        <ScrollView style={styles.chatContainer} showsVerticalScrollIndicator={false}>
          {post.comments.map((item) => (
           <CommentListItem item={item}/>
          ))
          }
            
          </ScrollView>

          {CommentInput()}
      
        </View>
       
        </KeyboardAvoidingView>
        
    )
  } else {
    return (
      
        <View
        onPress={() => {
          Keyboard.dismiss();
          }}
        style={styles.container}
        >  
          <Card
            containerStyle={styles.post}
          >
            <Card.Title>{post.text}</Card.Title>
          </Card>
 
          <ScrollView style={styles.chatContainer} showsVerticalScrollIndicator={false}>
          {post.comments.map((item) => (
            <CommentListItem item={item}/>
            ))}
            
          </ScrollView>
   
       {CommentInput()}
       
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#9D9D9D'
  },
  chatContainer: {
    flex:1,
    flexGrow: 1,
    padding: 20,
    width: 350,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#F8F0DF",
    overflow: 'hidden',
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