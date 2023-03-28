import React from 'react'
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify"

const YourWork = () => {
    const router = useRouter()

    const [loading, setLoading] = useState(false);
    const [ngoWork, setNgoWork] = useState([])
    const [userId, setUserId] = useState('')
    const [isPublic,setIsPublic] = useState(false)

    // const url = "https://khanakhazana-backend.onrender.com";
    const url = "http://localhost:5000";

    const getDetails = () => {
        setLoading(true)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ngoId: localStorage.getItem("userId") })
        };

        fetch(url+"/api/ngo/ngoWork", requestOptions)
            .then(response => response.text())
            .then(result => {
                setLoading(false);
                const data = JSON.parse(result);
                setNgoWork(data.ngoWork);
                console.log(data.ngoWork);
            })
            .catch(error => console.log('error', error));
    }


    useEffect(() => {
        setUserId(JSON.stringify(localStorage.getItem('userId')));
        if(localStorage.getItem('isPublic'))
        setIsPublic(JSON.stringify(localStorage.getItem('isPublic')))
    }, []);


    useEffect(() => {
        if (userId.length > 0) {
            console.log('userId', userId)
            getDetails()
        }
    }, [userId])
    
    const logout = () => {
        if (typeof window !== "undefined") {
            localStorage.setItem("authenticated", false);
            localStorage.setItem("isNgo", false);
            localStorage.setItem("isRes", false);
            localStorage.setItem("isPublic", false);
            window.localStorage.clear();
            router.push("/login");
        }
    };


    return (
        <>
            <div className='bg-your-donation pb-10'>
                <div className="flex justify-between items-center py-1 px-8 bg-[#09cc7f] text-white">
                    <img src="/temporary/assets/img/logo/logo.png" alt="logo" />
                    <button className="text-lg font-medium border py-1 px-3 rounded-lg bg-white text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors" onClick={logout}>
                        Logout
                    </button>
                </div>
                
                    <button className="ml-3 mt-2" onClick={() => router.push('/ngo-dashboard')}>
                        Back to Dashboard
                    </button>

                <div className="w-[50%] mx-auto mt-5">
                    {
                        ngoWork.length > 0 ? (
                            ngoWork.map((item) => (
                                <div className="font-epilogue border p-2 rounded-lg shadow-xl items-center mx-5 mb-10 bg-white" key={item.uuid}>
                                    <div>
                                        
                                        <div className="mt-4 text-xl flex flex-row justify-between">
                                            <span className='font-bold'>
                                                {" "}
                                                <img src={item.fileLink} />
                                            </span>
                                        </div>
                                        <div className="mt-4 text-xl flex flex-row justify-between">Donated On:
                                            <span className='font-bold'>
                                                {" "}
                                                {item.currDate}
                                            </span>
                                        </div>
                                        <div className="mt-2 flex flex-row justify-between">Quantity:
                                            <span>
                                                {" "}
                                                {item.foodQuantity} Kg
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-[30px]">No Work Currently</div>
                        )}
                </div>
            </div>
        </>
    )
}

export default YourWork
