//doesn't work yet
import { useDispatch, useSelector } from "react-redux";
import { editPostVotes } from "../redux/groupSlice";
import { addUserVoteAsync, editUserVoteAsync } from "../redux/userSlice";

export default function upvote(id) {
  const user = useSelector((state) => state.user);
  const group = useSelector((state) => state.group);
  const dispatch = useDispatch();

  const handleUpvotePress = () => {
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

  handleUpvotePress();
}
