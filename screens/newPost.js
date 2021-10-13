import React, {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, Text } from 'react-native'
import { Input, Button } from 'react-native-elements';
import {addPostAsync} from '../redux/groupSlice'

export default function NewPost({route, navigation}) {
  const [newPost, setNewPost] = useState('')
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const submitNewPost = () => {

    if (!newPost) {
      return alert("Please enter a name for your card")
    }
    dispatch(addPostAsync({
      user: user._id,
      text: newPost,
      group: route.params.group
    }))
    
    navigation.goBack();
  }


  return (
    <View style={styles.container}>
      <Input
        placeholder='New post goes here'
        multiline
        numberOfLines={4}
        onChangeText={text => setNewPost(text)}
      />
      <Button
        title="Submit Post"
        type="outline"
        onPress={submitNewPost}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  }
})