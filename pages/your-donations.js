import React from 'react'
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify"

const YourDonations = () => {
    const router = useRouter()

    const [loading, setLoading] = useState(false);
    const [resOrders, setResOrders] = useState([])
    const [userId, setUserId] = useState('')
    const [orderId, setOrderId] = useState('')
    // const url = "https://khanakhazana-backend.onrender.com";
    const url = "http://localhost:5000";

    const getDetails = () => {
        setLoading(true)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ resId: localStorage.getItem("userId") })
        };

        fetch(url+"/api/res/resOrders", requestOptions)
            .then(response => response.text())
            .then(result => {
                setLoading(false);
                const data = JSON.parse(result);
                setResOrders(data.resOrders);
                console.log(data.resOrders);
            })
            .catch(error => console.log('error', error));
    }

    const orderDone = (orderId) => {
        setLoading(true)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId: orderId })
        };

        fetch(url+"/api/res/orderDone", requestOptions)
            .then(response => response.text())
            .then(result => {
                setLoading(false);
                const data = JSON.parse(result);
                console.log(data);
                window.location.reload();
                toast.success(
                    `${data.message}`,
                    {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1500,
                    }
                );
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        setUserId(JSON.stringify(localStorage.getItem('userId')));
    }, []);


    useEffect(() => {
        if (userId.length > 0) {
            console.log('userId', userId)
            getDetails()
        }
    }, [userId])

    return (
        <>
            <div className='bg-your-donation h-screen overflow-hidden'>
                <div className="flex justify-between items-center py-1 px-8 bg-[#09cc7f] text-white">
                    <img src="/temporary/assets/img/logo/logo.png" alt="logo" />
                    <button className="text-lg font-medium border py-1 px-3 rounded-lg bg-white text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors" onClick={() => router.push('/login')}>
                        Logout
                    </button>
                </div>
                <button className="ml-3 mt-2" onClick={() => router.push('/restaurant-dashboard')}>
                    Back to Dashboard
                </button>

                <div className="w-[50%] mx-auto max-h-[70vh] overflow-y-auto mt-5">
                    {
                        resOrders.length > 0 ? (
                            resOrders.map((item) => (
                                <div className="font-epilogue border p-2 rounded-lg shadow-xl items-center mx-5 mb-10 bg-white" key={item.uuid}>
                                    <div>
                                        <div className="mt-4 text-xl flex flex-row justify-between">Donated On:
                                            <span className='font-bold'>
                                                {" "}
                                                {item.currDate}
                                            </span>
                                        </div>
                                        <div className="mt-2 flex flex-row justify-between">Order Id:
                                            <span>
                                                {" "}
                                                {item._id}
                                            </span>
                                        </div>
                                        <div className="mt-2 flex flex-row justify-between">Quantity:
                                            <span>
                                                {" "}
                                                {item.foodQuantity} Kg
                                            </span>
                                        </div>
                                        <div className="mt-2 flex flex-row justify-between">Type:
                                            <span>
                                                {" "}
                                                {item.foodType}
                                            </span>
                                        </div>
                                        <div className="mt-2 flex flex-row justify-between">Order Status:
                                            <span>
                                                {" "}
                                                {item.orderStatus}
                                            </span>
                                        </div>
                                        {(item.orderStatus === "Pending") && (
                                            <div className="mt-2 text-center">
                                                <button className="text-lg border py-2 px-5 mx-auto rounded-lg bg-[#09cc7f] text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition-colors" onClick={() => orderDone(item._id)}>
                                                    Mark as Done
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-[30px]">No Donations Currently</div>
                        )}
                </div>
            </div>
        </>
    )
}

export default YourDonations
