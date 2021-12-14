import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import CommentListItem from "./CommentListItem";

function ChatContainer({ post }) {
  return (
    <ScrollView
      style={styles.chatContainer}
      showsVerticalScrollIndicator={false}>
      {post.comments.map((item) => (
        <CommentListItem item={item} key={item._id} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    flexGrow: 1,
    padding: 20,
    width: 350,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#F8F0DF",
    overflow: "hidden",
  },
});

export default ChatContainer;
