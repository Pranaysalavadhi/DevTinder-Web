import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector} from 'react-redux'
import { addConnections } from '../utils/connectionSlice';
import { useEffect } from 'react';

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();

    const getConnections = async() =>{
       try
       { 
        const res = await axios.get(BASE_URL + "/user/connections",{withCredentials : true});
        dispatch(addConnections(res?.data?.data))
       }catch(err){
        console.log(err.message);
       }
        
    }
    useEffect(()=>{
        getConnections();
    },[]);

    if(!connections) return;
    if(connections.length === 0) return <h1 className='flex justify-center-safe'>No connections Found</h1>

  return (
    <>
    <div className= 'text-center my-10'>
      <h4 className= 'text-bold text-amber-100 text-3xl' >Connections</h4>

      {connections.map((connection) => {
        const { firstName,lastName,photoUrl,age,gender,about } = connection;
        return (
            <div className=' flex m-4 p-4 border rounded-lg bg-base-300 w-1/2 mx-auto'>
                <div>
                    <img 
                    alt='photo' 
                    className="w-20 h-20 rounded-full" 
                    src={photoUrl}
                    />
                </div>
                <div className="text-left mx-4">
                <h2 className='text-bold text-xl'>
                    {firstName + " " + lastName}
                </h2>
                {age && gender && <h2>{age + " " + gender}</h2>}
                <h2>{about}</h2>
                </div>
               
            </div>
              );
      })}
    </div>
    </>

  )

}

export default Connections;
