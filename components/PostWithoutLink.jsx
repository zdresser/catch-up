import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import { ListItem, Icon, Image } from "react-native-elements";

import useUpvote from "../util/useUpvote";
import useDownvote from "../util/useDownvote";

export const PostWithoutLink = ({ post, navigation }) => {
  const user = useSelector((state) => state.user);
  const group = useSelector((state) => state.group);
  const dispatch = useDispatch();

  const upvote = useUpvote();
  const downvote = useDownvote();

  const handlePostPress = (id) => {
    navigation.navigate("Post", { post: id });
  };

  return (
    <ListItem
      bottomDivider
      containerStyle={styles.postContainer}
      onPress={() => handlePostPress(post._id)}
      key={post._id}>
      <Icon
        name='arrow-up'
        type='font-awesome-5'
        color='#F8F0DF'
        onPress={() => upvote(post._id)}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{post.text}</ListItem.Title>
        <ListItem.Subtitle>
          Votes: {post.upvotes} Posted by {post.author.userName} {"\n"}
        </ListItem.Subtitle>
        <ListItem.Subtitle>Comments: {post.comments.length}</ListItem.Subtitle>
      </ListItem.Content>
      <Icon
        name='arrow-down'
        type='font-awesome-5'
        color='#F8F0DF'
        onPress={() => downvote(post._id)}
      />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "#79B4B7",
    width: 350,
    margin: 10,
    borderRadius: 35,
  },
  title: {
    color: "#FEFBF3",
  },
});
