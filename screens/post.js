import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, Linking } from 'react-native'
import {Card} from 'react-native-elements'
import { useDispatch, useSelector } from "react-redux";
import { getPostAsync, getPreviewAsync } from '../redux/postSlice'



export default function Post({ navigation, route }) {
  //use deep linking to launch link in appropriate app 

  const post = useSelector(state => state.post)
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getPostAsync(route.params.post))
  }, [])

  if (post.link) {
    
    return (
      <View style={styles.container}>
        <Card
          containerStyle={styles.post}
        >
          <Card.Title>{post.preview.description.substring(0,200)}</Card.Title>
          <Text>{post.preview.title}</Text>
          
          <Card.Image
            source={{ uri: post.preview.image }}
            style={{ height: 200 }}
           onPress={() => Linking.openURL(post.preview.url)}
          />
        </Card>
        <Text>Chat goes here</Text>
      </View>
 
    )
  } else {
    return (
      <View style={styles.container}>
        <Text>{post.text}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#9D9D9D'
  },
  post: {
    backgroundColor: '#FEFBF3',
    borderRadius: 5
  }
})