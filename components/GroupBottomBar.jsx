import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, Switch } from "react-native-elements";

function GroupBottomBar({ sortByDate, setSortByDate, group, navigation }) {
  const addUserPress = () => {
    navigation.navigate("AddUserToGroup", { group: group._id });
  };

  const newPostPress = () => {
    navigation.navigate("NewPost", { group: group._id });
  };

  return (
    <View style={styles.buttonContainer}>
      <View style={styles.slider}>
        {sortByDate === false && <Text>Sort By Votes</Text>}
        {sortByDate === true && <Text>Sort By New</Text>}
        <Switch
          value={sortByDate}
          onValueChange={() => setSortByDate(!sortByDate)}
          style={{ marginRight: 15 }}
        />
      </View>
      <View style={styles.bottomButton}>
        <Button
          title='New Post'
          titleStyle={{ color: "#79B4B7" }}
          buttonStyle={styles.button}
          onPress={() => newPostPress()}
        />
      </View>
      <View>
        <Button
          title='Invite to group'
          titleStyle={{ color: "#79B4B7" }}
          buttonStyle={styles.button}
          onPress={() => addUserPress()}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
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
  slider: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 5,
  },
});

export default GroupBottomBar;
