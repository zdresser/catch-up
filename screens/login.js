import React from 'react';
import { StyleSheet, Platform, TouchableWithoutFeedback, Keyboard, View } from 'react-native'
import { colors, ThemeProvider, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from "react";
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';


const theme = {
  colors: {
    ...Platform.select({
      default: colors.platform.android,
      ios: colors.platform.ios,
    }),
  },
};



export default function Login({navigation}) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const submitLogin = () => {
    console.log('submit')
  }

  const navigateToSignup = () => {
    navigation.navigate('Signup')
  }

  return (
   
      <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      }}>
      <View>
      <Input
        placeholder="email@address.com"
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        label="Email Address"
        onChangeText={text => setEmail(text)}          
      />
      <Input
        placeholder="password"
        leftIcon={{ type: 'font-awesome', name: "lock" }}
        label="Password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <Button
        title="Submit"
        type='outline'
        buttonStyle={styles.button}
        containerStyle={styles.container}
        onPress={submitLogin}
        />
    
      <Button
        title="Create new account"
        type="outline"
        buttonStyle={styles.signupButton}
        containerStyle={styles.container}
        onPress={navigateToSignup}
      />
     
      </View>
    </TouchableWithoutFeedback>
    
  )
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    marginRight: 10
  },
  container: {
    flexDirection: 'row',
    justifyContent: "flex-end"
  },
  signupButton: {
    width: 100,
    marginRight: 10,
    marginTop:10,
    backgroundColor: 'gainsboro'
  }
  
})