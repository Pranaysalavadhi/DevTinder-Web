import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react";
import UserCard from "./UserCard"
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed); // reading data from store
const getFeed = async () => {
  if(feed) return;
  try
  {
    const {data:{data}} = await axios.get( BASE_URL + "/feed" , {withCredentials : true});
    dispatch(addFeed(data));
    console.log(data);
  } catch(err){
    console.log(err);
  }
}
useEffect(()=>{
  getFeed();
},[]);

if(!feed) return;
if (feed.length === 0) {
  return (
    <div className="flex justify-center items-center min-h-[40vh]">
      <div className="card w-96 bg-base-200 shadow-xl text-center">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-primary">Aww, snap!</h2>
          <p className="text-gray-400">You've reached the end of the internet (or just our current user list).</p>
          <div className="card-actions justify-end mt-4">
             <button className="btn btn-outline btn-sm">Refresh Feed</button>
          </div>
        </div>
      </div>
    </div>
  );
}

  return(
    <>
    <h4>Feed</h4>
    <div className="flex justify-center my-10">
      <UserCard user = {feed?.[1]}/>
    </div>
    </>
  )
}

export default Feed;