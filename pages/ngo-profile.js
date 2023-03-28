import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const NgoProfile = () => {
    const [userId, setUserId] = useState('')
    const [ngoDetail, setNgoDetail] = useState({})
    const [ngoId, setNgoId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [address, setAddress] = useState('')
    const [area, setArea] = useState('')
    const [ratings, setRatings] = useState('')
    const [authToken, setAuthToken] = useState('')
    // const url = "https://khanakhazana-backend.onrender.com";
    const url = "http://localhost:5000";

    const router = useRouter()

    const ngoDetails = async () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(url+`/api/ngo/ngoDetails/${userId}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                const data = JSON.parse(result);
                setNgoDetail(localStorage.setItem("ngoDetail", data))
                setAuthToken(localStorage.setItem("authToken", data.authToken))
                setNgoId(localStorage.setItem("ngoId", data.ngoId))
                setName(data.ngoName)
                setEmail(data.ngoEmail)
                setMobileNumber(data.ngoMobileNumber)
                setAddress(data.ngoAddress)
                setArea(data.ngoArea)
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        setUserId(localStorage.getItem('userId'))
    }, [])

    useEffect(() => {
        if (userId.length > 0) {
            ngoDetails()
        }
    }, [userId])

    return (
        <>
            <div className="flex justify-between items-center py-4 px-8 bg-[#09cc7f] text-white">
                <img src="/temporary/assets/img/logo/logo.png" alt="logo" />
                <button className="text-lg font-medium border py-2 px-4 rounded-lg bg-white text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors" onClick={() => router.push('/login')}>
                    Logout
                </button>
            </div>

            <button className="ml-3 mt-2" onClick={() => router.push('/ngo-dashboard')}>
                Back to Dashboard
            </button>
            <div className="grid grid-rows-2 border items-center w-[50%] h-[350px] mx-auto shadow-2xl">
                <div className="border-b pb-2">
                    <h1 className="font-epilogue text-[40px] font-bold text-[#303735] text-center mb-5"> {name}
                    </h1>
                </div>
                <div className="pb-5">
                    <h1 className="my-3 flex flex-row justify-between mx-5">Email:
                        <span>
                            {email}
                        </span>
                    </h1>
                    <h1 className="my-3 flex flex-row justify-between mx-5">Contact Number:
                        <span>
                            {mobileNumber}
                        </span>
                    </h1>
                    <p className="my-3 flex flex-row justify-between mx-5">Address:
                        <span>
                            {address}
                        </span>
                    </p>
                    <p className="my-3 flex flex-row justify-between mx-5">Area:
                        <span>
                            {area}
                        </span>
                    </p>
                </div>
            </div>
        </>
    )
}

export default NgoProfile
