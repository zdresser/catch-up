import React, {useState} from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';



export default function Signup() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')

  const submitNewUser = () => {
    console.log('new user')
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
        
        <Input
        placeholder="Username"
        leftIcon={{ type: 'font-awesome', name: 'user' }}
        label="Username"
        onChangeText={text => setUsername(text)}          
        />
        <Input
        placeholder="555-555-5555"
        leftIcon={{ type: 'font-awesome', name: 'mobile' }}
        label="Phone number"
        onChangeText={text => setUsername(text)}          
        />

      <Button
        title="Submit"
        type='outline'
        buttonStyle={styles.button}
        containerStyle={styles.container}
        onPress={submitNewUser}
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
})