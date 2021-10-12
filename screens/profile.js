import React from 'react';
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native'


export default function Profile() {
  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>My Info</Text>
      
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