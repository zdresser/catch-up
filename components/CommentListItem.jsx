import React from "react";
import { ListItem } from "react-native-elements";
import { StyleSheet } from "react-native";
const CommentListItem = ({ item }) => {
  return (
    <ListItem bottomDivider containerStyle={styles.commentContainer}>
      <ListItem.Subtitle>{item.author.userName}</ListItem.Subtitle>
      <ListItem.Title>{item.text}</ListItem.Title>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    margin: 5,
    borderRadius: 5,
    backgroundColor: "#79B4B7",
  },
});

export default CommentListItem;
