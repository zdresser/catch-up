import React, {useState} from 'react'
import axios from 'axios'
import { StyleSheet, View, Alert } from 'react-native'
import {Button, Input} from 'react-native-elements'

export default function AddUserToGroup({ route, navigation }) {
  const [userEmail, setUserEmail] = useState('')
  
  const sendRequest = async () => {
    axios.post(`http://192.168.4.62:5000/api/groups/${route.params.group}/add`, {email: userEmail})
      .then((response) => {

        if (response.status === 200) {
          
          Alert.alert(
            "User added to group!",
            '',
            [{
              text: "Go Back",
              onPress: () => navigation.goBack()
            }],
            {cancelable: false}
          )
        }
      })
      .catch((error) => {
        const err = error.toJSON()

        if (err.status === 404) {
          return alert("No user found with that email address. Invite them to download the app!")
        }

        if (err.status === 400) {
          return alert("That user is already in the group.")
        }
      })      
  }


  const submitNewUser = () => {
    if (!userEmail) {
      return alert("Enter an email address")
    }

    sendRequest()
  }

  return (
    <View style={styles.container}>
     
      <Input
        label='Who do you want to add to the group?'
        placeholder='Enter email address'
      
        onChangeText={text => setUserEmail(text)}
      />
     
      <Button
        title="Submit"
        type="outline"
        onPress={submitNewUser}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  }
})