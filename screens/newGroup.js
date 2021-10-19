import React, {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { addGroupAsync } from '../redux/userSlice'

export default function NewGroup({ route, navigation }) {

  const user = useSelector(state => state.user)
  
  const [groupTitle, setGroupTitle] = useState('')
  const dispatch = useDispatch();

  const submitNewGroup = () => {
    if (!groupTitle) {
      return alert("Your group needs a title")
    }
    dispatch(addGroupAsync({
      creator: user._id ,
      title: groupTitle
    }))
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
     
      <Input
        placeholder='Group title goes here'
        onChangeText={text => setGroupTitle(text)}
      />
      
      <Button
        title="Create Group"
        type="outline"
        onPress={submitNewGroup}
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