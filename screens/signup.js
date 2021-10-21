import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, Text } from 'react-native'
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik'
import * as yup from 'yup'
import { signupAsync } from '../redux/userSlice'
import { useDispatch } from "react-redux";

const signupValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required'),
  userName: yup
    .string()
    .required("Username is required"),
  phone: yup
  .string()
  .required('Phone number is required'),
})
export default function Signup() {
  const dispatch = useDispatch();

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
  }}>
      <View>
        <Formik
          validationSchema={signupValidationSchema}
          initialValues={{ email: '', password: '', phone: '', userName: '' }}
          onSubmit={values => dispatch(signupAsync(values))}
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
                onChangeText={text => setPassword(text)}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {errors.password &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
            }
              <Input
                placeholder="Username"
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                label="Username"
                onChangeText={handleChange('userName')}
                onBlur={handleBlur('userName')}
                value={values.userName}
              />

              {errors.userName &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.userName}</Text>
              }
              <Input
                placeholder="5555555555"
                leftIcon={{ type: 'font-awesome', name: 'mobile' }}
                label="Phone number"
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
              />
              {errors.phone &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.phone}</Text>
              }
              <Button
                title="Submit"
                type='outline'
                buttonStyle={styles.button}
                containerStyle={styles.container}
                onPress={handleSubmit}
                disabled={!isValid}
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
})