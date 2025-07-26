import React, { use } from 'react'
import OrderData from '../components/custom/OrderData'
import { useState } from 'react'
import { useEffect } from 'react'
import useErrorLogout from "../hooks/use-error-logout"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const {handleErrorLogout}=useErrorLogout();
  useEffect(() => {
    const getMyOrders=async()=>{
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/get-orders-by-user-id', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = response.data;
        console.log("My Orders:", data);
        setOrders(data.data);
      } catch (error) {
        handleErrorLogout(error);
      }
    };
    getMyOrders();
  }, []);
  return (
    <div className='w-[90vw] lg:w-[50vw] mx-auto my-10 sm:my-32 grid gap-3'>
      <h1 className='text-2xl font-bold'> My Orders</h1>
      <div className='grid gap-3'>

        {
          orders.length>0?orders.map((order)=>{
            console.log("Order:", order);
            return <OrderData key={order._id} {...order} />;
          }):<p>No Orders to Show</p>
        }
        
        
      </div>
    </div>
  )
}

export default MyOrders