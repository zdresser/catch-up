import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Linking,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { Card } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { getPostAsync, addCommentFromSocket } from "../redux/postSlice";
import store from "../redux/store";
import socket from "../socket-connect";

import CommentInput from "../components/CommentInput";
import ChatContainer from "../components/ChatContainer";
socket.off("newComment").on("newComment", (comment) => {
  store.dispatch(addCommentFromSocket(comment));
});

export default function Post({ navigation, route }) {
  const user = useSelector((state) => state.user);
  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostAsync(route.params.post));
  }, []);

  //Wrapper approach is more readable, less repetition but created an
  //error in rendering the comment input.

  //Return using wrapper code below:
  // return (
  //   <Wrapper>
  //   <ScrollView
  //     style={styles.chatContainer}
  //     showsVerticalScrollIndicator={false}
  //   >
  //     {post.comments.map((item) => (
  //       <CommentListItem item={item} key={item._id}/>
  //     ))
  //     }

  //     </ScrollView>
  //     {commentInput()}
  //     </Wrapper>
  // )

  if (post.link) {
    return (
      <KeyboardAvoidingView
        onPress={() => {
          Keyboard.dismiss();
        }}
        style={styles.container}>
        <View style={styles.inner}>
          <Card containerStyle={styles.post}>
            <Card.Title>
              {post.preview.description.substring(0, 200)}
            </Card.Title>
            <Text>{post.preview.title}</Text>

            {post.preview.image !==
              "https://abs.twimg.com/responsive-web/client-web/icon-ios.8ea219d5.png" && (
              <Card.Image
                source={{ uri: post.preview.image }}
                onPress={() => Linking.openURL(post.preview.url)}
              />
            )}
          </Card>

          <ChatContainer post={post} />

          <CommentInput user={user} post={post} />
        </View>
      </KeyboardAvoidingView>
    );
  } else {
    return (
      <View
        onPress={() => {
          Keyboard.dismiss();
        }}
        style={styles.container}>
        <Card containerStyle={styles.post}>
          <Card.Title>{post.text}</Card.Title>
        </Card>

        <ChatContainer post={post} />

        <CommentInput user={user} post={post} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#9D9D9D",
  },
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
  commentContainer: {
    margin: 5,
    borderRadius: 5,
    backgroundColor: "#79B4B7",
  },
  newCommentContainer: {
    marginBottom: 5,
    width: 350,
    borderRadius: 5,
    backgroundColor: "#F8F0DF",
  },
  post: {
    backgroundColor: "#FEFBF3",
    borderRadius: 5,
    width: 350,
  },
  inner: {
    padding: 24,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
