import React, {useEffect} from 'react';
import { StyleSheet, View, Text, Button, ScrollView, FlatList } from 'react-native'
import {ListItem} from 'react-native-elements'
import { useDispatch, useSelector } from "react-redux";
import { getPostAsync } from '../redux/postSlice'


export default function Post({ navigation, route }) {
  
  const post = useSelector(state => state.post)

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getPostAsync(route.params.post))
  }, [])


  return (
   
  
    <View style={styles.container}>
      <Text>{post.text}</Text>
    
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