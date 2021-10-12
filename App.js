import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Header from './components/header';
import Home from './screens/home';
import Profile from './screens/profile';
import Post from './screens/post';
import Group from './screens/group';
import Login from './screens/login';
import Signup from './screens/signup'
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();
const isSignedIn = false;
//add dynamically generated titles for groups, post
//styles not applying in navcontainer
export default function App() {
  return (
    <NavigationContainer screenOptions={{
      headerStyle: {
        backgroundColor: "green",
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        },
    }}>
      {/* <Header /> */}
      <Stack.Navigator>
        {isSignedIn ? (
          <>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Group" component={Group} />
        <Stack.Screen name="Post" component={Post} />
        </>
        ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} /> 
          </>
        )}
        
        
      </Stack.Navigator>
   </NavigationContainer>
       
  );
}

const styles = StyleSheet.create({
  header: {

  }
})