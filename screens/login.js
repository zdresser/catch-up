import React from 'react';
import { useDispatch } from "react-redux";
import { loginAsync } from '../redux/userSlice';
import { StyleSheet, Text, TouchableWithoutFeedback, Keyboard, View } from 'react-native'
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from "react";
import {Formik} from 'formik'
import * as yup from 'yup'

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
})

export default function Login({navigation}) {
  const dispatch = useDispatch();

  const navigateToSignup = () => {
    navigation.navigate('Signup')
  }

  return (
   
      <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      }}>
      <View>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{ email: '', password: '' }}
          onSubmit={values => dispatch(loginAsync(
            values
          ))}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
            <>
      <Input
        placeholder="email@address.com"
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        label="Email Address"
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        value={values.email}
        keyboardType="email-address"        
              />
        {errors.email &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
       }
      <Input
        placeholder="password"
        leftIcon={{ type: 'font-awesome', name: "lock" }}
        label="Password"
        secureTextEntry={true}
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        value={values.password}
      />
        {errors.password &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
       }
      <Button
        title="Submit"
        type='outline'
        buttonStyle={styles.button}
        containerStyle={styles.container}
        onPress={handleSubmit}
        disabled={!isValid}
        />
    
      <Button
        title="Create new account"
        type="outline"
        buttonStyle={styles.signupButton}
        containerStyle={styles.container}
        onPress={navigateToSignup}
      />
            </>
          )}
      
     </Formik>
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