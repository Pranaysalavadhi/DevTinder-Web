import NavBar from './NavBar'
import Footer from './Footer'
import axios from 'axios'
import { Outlet, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useEffect, useState} from 'react'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const [loading, setLoading] = useState(true);  

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response?.status === 401) {  
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return null;  // block render until auth check is done

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body
