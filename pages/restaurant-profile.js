import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const RestaurantProfile = () => {
    const [userId, setUserId] = useState('')
    const [restaurantDetails, setRestaurantDetails] = useState({})
    const [resId, setResId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [address, setAddress] = useState('')
    const [area, setArea] = useState('')
    const [ratings, setRatings] = useState('')
    const [authToken, setAuthToken] = useState('')

    const router = useRouter()
    // const url = "https://khanakhazana-backend.onrender.com";
    const url = "http://localhost:5000";

    const resDetails = async () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(url+`/api/res/resDetails/${userId}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                const data = JSON.parse(result);
                setRestaurantDetails(localStorage.setItem("restaurantDetail", data))
                setAuthToken(localStorage.setItem("authToken", data.authToken))
                setResId(localStorage.setItem("resId", data.resId))
                setName(data.resName)
                setEmail(data.resEmail)
                setMobileNumber(data.resMobileNumber)
                setAddress(data.resAddress)
                setArea(data.resArea)
                setRatings(data.stars)
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        setUserId(localStorage.getItem('userId'))
    }, [])

    useEffect(() => {
        if (userId.length > 0) {
            resDetails()
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
            <div className="flex justify-between items-center py-4 px-8 bg-[#09cc7f] text-white">
                <img src="/temporary/assets/img/logo/logo.png" alt="logo" />
                <button className="text-lg font-medium border py-2 px-4 rounded-lg bg-white text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors" onClick={logout}>
                    Logout
                </button>
            </div>

            <button className="ml-3 mt-2" onClick={() => router.push('/restaurant-dashboard')}>
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
                    <span className="my-3 flex flex-row justify-between mx-5">Ratings:
                        <span>
                            {ratings}⭐
                        </span>
                    </span>
                </div>
            </div>
        </>
    )
}

export default RestaurantProfile;
