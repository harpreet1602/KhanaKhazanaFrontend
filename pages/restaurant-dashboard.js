import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const RestaurantDashboard = () => {

    const [userId, setUserId] = useState('')
    const [resId, setResId] = useState('')

    // const url = "https://khanakhazana-backend.onrender.com";
    const url = "http://localhost:5000";
    const router = useRouter()

    const resDetails = async () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${url}/api/res/resDetails/${userId}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                const data = JSON.parse(result);
                console.log(data);
                setResId(localStorage.setItem("resId", data.resId))
            })
            .catch(error => console.log('error', error));
    }

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

    useEffect(() => {
        setUserId(localStorage.getItem('userId'))
    }, [])

    useEffect(() => {
        if (userId.length > 0) {
            resDetails()
        }
    }, [userId])

    return (
        <>
            <div className="flex justify-between items-center py-4 px-8 bg-[#09cc7f] text-white">
                <img src="/temporary/assets/img/logo/logo.png" alt="logo" />
                <button className="text-lg font-medium border py-2 px-4 rounded-lg bg-white text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors" onClick={logout}>
                    Logout
                </button>
            </div>

            <div className="text-center my-10 flex flex-col font-epilogue">
                <h2 className="text-2xl font-bold mb-8">Make a Difference Today</h2>
                <p className="text-lg mb-16">&quot;No act of kindness, no matter how small, is ever wasted.&quot; - Aesop</p>
                <button className="text-2xl border py-3 px-8 mx-auto rounded-lg bg-[#09cc7f] text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition-colors mb-8" onClick={() => router.push('/donate')}>
                    Make a Donation
                </button>
                <button className="text-2xl border py-3 px-8 mx-auto rounded-lg bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors mb-8" onClick={() => router.push('/restaurant-profile')}>
                    Your Profile
                </button>
                <button className="text-2xl border py-3 px-8 mx-auto rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors" onClick={() => router.push('/your-donations')}>
                    Your Donations
                </button>
            </div>
        </>
    )
}

export default RestaurantDashboard;
