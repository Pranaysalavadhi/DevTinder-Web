import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () =>{
   const user = useSelector((store) => store.user);
   return user && (
    <>
    <div>
        <h4>Profile</h4>
       <EditProfile user = {user}/>
    </div>
    </>
   )
}
export default  Profile;

