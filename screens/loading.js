import React from 'react';
import { StyleSheet, View,  Text, FlatList, ScrollView, Platform } from 'react-native'
import {  Button, ListItem, Badge } from 'react-native-elements';




export default function Loading() {
  //add logic to toggle between login/signup and group view
  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Loading...</Text>
     
      </View>
     
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    
  }
})