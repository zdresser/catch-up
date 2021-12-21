import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import { ListItem, Icon, Image } from "react-native-elements";
import { editPostVotes } from "../redux/groupSlice";
import { addUserVoteAsync, editUserVoteAsync } from "../redux/userSlice";

import upvote from "../util/upvote";

export const PostWithoutLink = ({ post, navigation }) => {
  const user = useSelector((state) => state.user);
  const group = useSelector((state) => state.group);
  const dispatch = useDispatch();
  const handlePostPress = (id) => {
    navigation.navigate("Post", { post: id });
  };

  const handleUpvotePress = (id) => {
    //check for previous vote
    if (user.voteRecord.some((record) => record.post === id)) {
      //find obj in voteRecord array
      const postVoteRecord = user.voteRecord.find(
        (record) => record.post === id
      );
      //check to see if vote === 1
      if (postVoteRecord.vote === 1) {
        return alert("You've already upvoted this post");
      }
      dispatch(
        editUserVoteAsync({
          user: user._id,
          post: id,
          vote: postVoteRecord.vote + 1,
        })
      );
    } else {
      //dispatch addUserVoteAsync
      dispatch(
        addUserVoteAsync({
          user: user._id,
          post: id,
          vote: 1,
        })
      );
    }

    const post = group.posts.find(({ _id }) => _id === id);

    const votes = post.upvotes + 1;
    //dispatch update
    dispatch(
      editPostVotes({
        post: id,
        upvotes: votes,
      })
    );
  };

  const handleDownvotePress = (id) => {
    if (user.voteRecord.some((record) => record.post === id)) {
      //find obj in voteRecord array
      const postVoteRecord = user.voteRecord.find(
        (record) => record.post === id
      );
      //check to see if vote === 1
      if (postVoteRecord.vote === -1) {
        return alert("You've already downvoted this post");
      }

      //dispatch editUserVoteAsync
      dispatch(
        editUserVoteAsync({
          user: user._id,
          post: id,
          vote: postVoteRecord.vote - 1,
        })
      );
    } else {
      //dispatch addUserVoteAsync
      dispatch(
        addUserVoteAsync({
          user: user._id,
          post: id,
          vote: -1,
        })
      );
    }
    const post = group.posts.find(({ _id }) => _id === id);

    const votes = post.upvotes - 1;

    dispatch(
      editPostVotes({
        post: id,
        upvotes: votes,
      })
    );
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
        onPress={() => handleUpvotePress(post._id)}
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
        onPress={() => handleDownvotePress(post._id)}
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
