import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'

//component and screen imports
import Header from '../components/header';
import Home from '../screens/home';
import Profile from '../screens/profile';
import Post from '../screens/post';
import Group from '../screens/group';
import Login from '../screens/login';
import Signup from '../screens/signup';
import Loading from '../screens/loading';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const user = useSelector(state => state.user);

  return (
    <NavigationContainer>
      {/* <Header /> */}
      <Stack.Navigator>
        {user.authenticated ? (
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
  )
}