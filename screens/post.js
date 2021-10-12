import React from 'react';
import { StyleSheet, View, Text, Button, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native'


export default function Post() {
  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
  }}>
    <View style={styles.container}>
      <Text style={styles.title}>This is a post</Text>
      <ScrollView>
        <Text>Comment 1</Text>
        <Text>Comment 2</Text>
        <Text>Comment 3</Text>
      </ScrollView>
   </View>
  </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    alignItems: 'center',
  }
})