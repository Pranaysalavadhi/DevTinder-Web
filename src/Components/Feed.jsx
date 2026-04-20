import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (feed) return;

    try {
      const { data } = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  const handleAction = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return <p className="text-center mt-10">Loading...</p>;

  if (feed.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <div className="card w-96 bg-base-200 shadow-xl text-center">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-primary">Aww, snap!</h2>
            <p className="text-gray-400">
              You've reached the end of the feed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center my-10">
      {/* Show one card at a time (Tinder style) */}
      <UserCard
        user={feed[0]}
        showActions={true}
        onAction={handleAction}
      />
    </div>
  );
};

export default Feed;