import axios from "axios";
import {BASE_URL} from "../utils/constants"
import { useDispatch, useSelector } from "react-redux";
import {addRequests} from '../utils/requestSlice';
import { useEffect } from "react";

const Requests = () =>{
    const requests = useSelector((store) => store.requests)
    const dispatch = useDispatch();

    const getRequest = async () =>{
        try
        {
            const res = await axios.get(BASE_URL + '/user/requests/received', {withCredentials : true} );
            dispatch(addRequests(res?.data?.data));
        }
        catch(err){
            console.log(err.message);
        }
    }
    useEffect(() =>{
        getRequest();
    },[]);

    if(!requests) return;
    if(requests.length === 0) return <h3>No request found</h3>

    return  (
        <>
        <div className= 'text-center my-10'>
         <h4 className= 'text-bold text-amber-100 text-3xl' >My Requests</h4>

        {requests.map((request) => {
        const { _id,firstName,lastName,photoUrl,age,gender,about } = request.fromUserId;
        return (
            <div 
              key={_id} 
              className=' flex justify-between items-center m-4 p-4 border rounded-lg bg-base-300 w-1/2 mx-auto'>
                <div>
                    <img 
                    alt='photo' 
                    className="w-20 h-20 rounded-full" 
                    src={photoUrl}
                    />
                </div>
                <div className="text-left mx-4">
                <h2 className='font-bold text-xl'>
                    {firstName + " " + lastName}
                </h2>
                {age && gender && <h2>{age + " " + gender}</h2>}
                <h2>{about}</h2>
                </div>
                <div>
                    <button className="btn btn-primary mx-2">Reject</button>
                    <button className="btn btn-secondary mx-2">Accept</button>
                    </div>
               
            </div>
              );
             })}
        </div>
        </>
    )
}

export default Requests;
