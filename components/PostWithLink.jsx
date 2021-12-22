import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import { ListItem, Icon, Image } from "react-native-elements";

import useUpvote from "../util/useUpvote";
import useDownvote from "../util/useDownvote";

export const PostWithLink = ({ post, navigation }) => {
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
      onPress={() => handlePostPress(post._id)}>
      <Icon
        name='arrow-up'
        type='font-awesome-5'
        color='#F8F0DF'
        onPress={() => upvote(post._id)}
      />

      <ListItem.Content>
        <ListItem.Title style={styles.title}>{post.text}</ListItem.Title>
        <ListItem.Subtitle>
          Votes: {post.upvotes} Posted by {post.author.userName}
          {"\n"}
        </ListItem.Subtitle>
        <ListItem.Subtitle>Comments: {post.comments.length}</ListItem.Subtitle>

        <ListItem.Subtitle>{post.preview.title}</ListItem.Subtitle>
        <ListItem.Subtitle>
          {post.preview.description.substring(0, 100)}
        </ListItem.Subtitle>

        {post.preview.image !==
          "https://abs.twimg.com/responsive-web/client-web/icon-ios.8ea219d5.png" && (
          <Image
            source={{ uri: post.preview.image }}
            style={{
              height: 250,
              width: 250,
            }}
          />
        )}
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
