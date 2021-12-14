import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { addPostAsync } from "../redux/groupSlice";

export default function NewPost({ route, navigation }) {
  const [newPost, setNewPost] = useState("");
  const [newLink, setNewLink] = useState("");
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const submitNewPost = () => {
    if (!newPost && !newLink) {
      return alert("Please enter a link or some text for your post");
    }
    dispatch(
      addPostAsync({
        author: user._id,
        authorName: user.username,
        text: newPost,
        link: newLink,
        group: route.params.group,
      })
    );

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder='New post goes here'
        multiline
        numberOfLines={4}
        onChangeText={(text) => setNewPost(text)}
      />
      <Input
        placeholder='Link goes here'
        onChangeText={(text) => setNewLink(text)}
      />
      <Button title='Submit Post' type='outline' onPress={submitNewPost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
  },
});
