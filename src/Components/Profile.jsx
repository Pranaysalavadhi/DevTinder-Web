import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      <h4 className="text-center text-xl font-bold mt-4">Profile</h4>
      <EditProfile user={user} />
    </div>
  );
};

export default Profile;