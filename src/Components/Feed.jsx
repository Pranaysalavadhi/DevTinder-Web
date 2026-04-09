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