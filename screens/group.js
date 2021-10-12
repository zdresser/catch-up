import React from 'react';
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native'


export default function Group({ route, navigation }) {
  
  console.log(route.params)
  //posts need to include author, , upvote buttons, num comments
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Group Title</Text>
      <ScrollView>
        
        <Text>Post 1 </Text>
        <Text>Post 2</Text>
        <Text>Post 3</Text>
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