import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getPostAsync, addCommentFromSocket } from "../redux/postSlice";
import store from "../redux/store";
import socket from "../socket-connect";

import CommentInput from "../components/CommentInput";
import ChatContainer from "../components/ChatContainer";
import Wrapper from "../components/Wrapper";

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

  return (
    <Wrapper post={post}>
      <ChatContainer post={post} />

      <CommentInput user={user} post={post} />
    </Wrapper>
  );
}
