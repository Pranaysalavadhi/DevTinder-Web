import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  if (!user) return <p>User not found!!</p>;

  const { _id, firstName, lastName, age, about, photoUrl } = user;

  const dispatch = useDispatch();

  const handleSendRequest = async (status, _id) =>{
     try{
       const res = await axios.post(
        BASE_URL + "/request/send/"+ status + "/" + _id,
        {},
        {withCredentials : true});
        dispatch(removeUserFromFeed(user._id));
        
     }catch(err){
      console.log(err.message);
     }
  }

  return (
    <div className="card bg-base-300 w-96 shadow-xl rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105">
      
      {/* Image */}
      <figure className="h-60">
        <img
          src={photoUrl || "https://via.placeholder.com/300"}
          alt="user"
          className="h-full w-full object-cover"
        />
      </figure>

      {/* Body */}
      <div className="card-body">
        <h2 className="card-title text-lg font-bold">
          {firstName} {lastName}
        </h2>

        {age && <p className="text-sm opacity-70">Age: {age}</p>}

        {about && (
          <p className="text-sm mt-1 line-clamp-2">
            {about}
          </p>
        )}

        {/* Buttons */}
        <div className="card-actions justify-between mt-4">
          <button className="btn btn-outline btn-error btn-sm" onClick={() =>handleSendRequest("ignored",_id)}>Pass</button>
          <button className="btn btn-primary btn-sm" onClick={() => handleSendRequest("interested",_id)}>Collab</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;