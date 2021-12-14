import React, { useState } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { Input, Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import { addComment } from "../redux/postSlice";

const CommentInput = ({ user, post }) => {
  const [newCommentText, setNewCommentText] = useState("");
  const dispatch = useDispatch();

  const submitComment = (text) => {
    if (!newCommentText) {
      return alert("Enter a comment first");
    }

    dispatch(
      addComment({
        author: user._id,
        post: post._id,
        text: newCommentText,
      })
    );

    setNewCommentText("");
    Keyboard.dismiss();
  };
  return (
    <View style={styles.newCommentContainer}>
      <Input
        value={newCommentText}
        placeholder='Add a comment'
        onChangeText={(text) => setNewCommentText(text)}
        rightIcon={
          <Icon
            type='font-awesome-5'
            name='paper-plane'
            onPress={submitComment}
          />
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  newCommentContainer: {
    marginBottom: 5,
    width: 350,
    borderRadius: 5,
    backgroundColor: "#F8F0DF",
  },
});
export default CommentInput;
