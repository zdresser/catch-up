import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import * as SecureStore from 'expo-secure-store';
import { loginFromSecureStore } from '../redux/userSlice';
//component and screen imports

import Home from '../screens/home';
import Profile from '../screens/profile';
import Post from '../screens/post';
import Group from '../screens/group';
import Login from '../screens/login';
import Signup from '../screens/signup';
import NewPost from '../screens/newPost';
import NewGroup from '../screens/newGroup';
import AddUserToGroup from '../screens/addUserToGroup'

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const user = useSelector(state => state.user);
  const group = useSelector(state => state.group);
  const dispatch = useDispatch();

  useEffect(() => {
    loadStorageData();
  }, [])
  
  async function loadStorageData() {
    const userData = await SecureStore.getItemAsync("userData")
    if (userData) {
      const data = JSON.parse(userData)
      dispatch(loginFromSecureStore(data))
    }
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#79B4B7'
          },
          headerTintColor: '#FEFBF3'
        }}  
      >
        {user.authenticated ? (
        <>
          <Stack.Screen name="CatchUp" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Group" component={Group}
              options={{
                title: group.title
              }}
          />
          <Stack.Screen name="Post" component={Post} />
          <Stack.Screen name="NewPost" component={NewPost} />
          <Stack.Screen name="NewGroup" component={NewGroup} />
          <Stack.Screen name="AddUserToGroup" component={AddUserToGroup} />
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