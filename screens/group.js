import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import { ListItem, Icon, Image } from "react-native-elements";
import {
  getGroupAsync,
  loadMorePosts,
  editPostVotes,
  sortPostsByUpvotes,
  sortPostsByDate,
} from "../redux/groupSlice";
import { addUserVoteAsync, editUserVoteAsync } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import GroupBottomBar from "../components/GroupBottomBar";
import { PostWithLink } from "../components/PostWithLink";
import { PostWithoutLink } from "../components/PostWithoutLink";

export default function Group({ route, navigation }) {
  //redux state
  const group = useSelector((state) => state.group);
  const user = useSelector((state) => state.user);
  //component state
  const [sortByDate, setSortByDate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

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

  const renderPost = ({ item }) => {
    if (item.link) {
      return <PostWithLink post={item} navigation={navigation} />;
    } else {
      return <PostWithoutLink post={item} navigation={navigation} />;
    }
  };

  const loadMore = async () => {
    setIsLoading(true);
    const page = currentPage + 1;

    dispatch(loadMorePosts({ group: route.params.group, page: page }));
    setCurrentPage(page);
    setIsLoading(false);
  };

  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size='large' color='white' />
      </View>
    ) : null;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={group.posts}
        renderItem={renderPost}
        keyExtractor={(item) => item._id}
        onEndReached={loadMore}
        onEndReachedThreshold={0}
        ListFooterComponent={renderLoader}
      />
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
  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  },
});
