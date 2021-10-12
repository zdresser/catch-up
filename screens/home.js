import React from 'react';
import { StyleSheet, View,  Text, ScrollView, Platform } from 'react-native'
import { colors, ThemeProvider, Button } from 'react-native-elements';

const theme = {
  colors: {
    ...Platform.select({
      default: colors.platform.android,
      ios: colors.platform.ios,
    }),
  },
};


export default function Home() {
  //add logic to toggle between login/signup and group view
  return (
    <ThemeProvider theme={theme}>
    <View style={styles.container}>
      <Text style={styles.title}>My Groups</Text>
      <ScrollView>
        {/* list of groups */}
      </ScrollView>
        {/* link to profile -- or in header?*/}
      </View>
      </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    alignItems: 'center',
  }
})