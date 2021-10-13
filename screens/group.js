import React, {useEffect} from 'react';
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native'
import { getGroupAsync } from '../redux/groupSlice'
import { useDispatch, useSelector } from "react-redux";

export default function Group({ route, navigation }) {
  const group = useSelector(state => state.group)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroupAsync(route.params.group))
  }, [])

  const handlePostPress = (id) => {
    //nav to page for post
  }

  //style entries
  //posts need to include author, , upvote buttons, num comments
  //add infinite scroll
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{group.title}</Text>
      <ScrollView>
        {group.posts.map((post, index) => {
          return (
            <Text
              key={index}
              onPress={() => handlePostPress(post._id)}
            >{post.text} </Text>
          )
        })
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    alignItems: 'center',
  }
})