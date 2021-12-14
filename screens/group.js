import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Linking } from "react-native";
import { ListItem, Button, Icon, Image, Switch } from "react-native-elements";
import {
  getGroupAsync,
  editPostVotes,
  sortPostsByUpvotes,
  sortPostsByDate,
} from "../redux/groupSlice";
import { addUserVoteAsync, editUserVoteAsync } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import GroupBottomBar from "../components/GroupBottomBar";

export default function Group({ route, navigation }) {
  const group = useSelector((state) => state.group);
  const user = useSelector((state) => state.user);
  const [sortByDate, setSortByDate] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroupAsync(route.params.group));
  }, []);

  useEffect(() => {
    if (sortByDate === false) {
      dispatch(sortPostsByUpvotes(group.posts));
    }

    if (sortByDate === true) {
      dispatch(sortPostsByDate(group.posts));
    }
  }, [group.posts, sortByDate, setSortByDate]);

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

  const PostWithLink = ({ post }) => {
    return (
      <ListItem
        bottomDivider
        containerStyle={styles.postContainer}
        onPress={() => handlePostPress(post._id)}>
        <Icon
          name='arrow-up'
          type='font-awesome-5'
          color='#F8F0DF'
          onPress={() => handleUpvotePress(post._id)}
        />

        <ListItem.Content>
          <ListItem.Title style={styles.title}>{post.text}</ListItem.Title>
          <ListItem.Subtitle>
            Votes: {post.upvotes} Posted by {post.author.userName}
            {"\n"}
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            Comments: {post.comments.length}
          </ListItem.Subtitle>

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
          onPress={() => handleDownvotePress(post._id)}
        />
      </ListItem>
    );
  };

  const PostWithoutLink = ({ post }) => {
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
          <ListItem.Subtitle>
            Comments: {post.comments.length}
          </ListItem.Subtitle>
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

  return (
    <View style={styles.container}>
      <ScrollView>
        {group.posts.map((post) => {
          if (post.link) {
            return <PostWithLink post={post} key={post._id} />;
          } else {
            return <PostWithoutLink post={post} key={post._id} />;
          }
        })}
      </ScrollView>

      <GroupBottomBar
        sortByDate={sortByDate}
        setSortByDate={setSortByDate}
        group={group}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#9D9D9D",
  },
  button: {
    backgroundColor: "#FEFBF3",
  },
  buttonContainer: {
    margin: 5,
    flex: 0,
    flexDirection: "row",
  },
  bottomButton: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginRight: 20,
  },
  postContainer: {
    backgroundColor: "#79B4B7",
    width: 350,
    margin: 10,
    borderRadius: 35,
  },
  slider: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 5,
  },
  title: {
    color: "#FEFBF3",
  },
});
