import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify"

const NgoDashboard = () => {
    const router = useRouter()

    const [loading, setLoading] = useState(false);
    const [resData, setResData] = useState([])
    const [find, setFind] = useState(false);
    const [area, setArea] = useState('')
    // const url = "https://khanakhazana-backend.onrender.com";
    const url = "http://localhost:5000";

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ area })
        };

        fetch(url+"/api/ngo/findRes", requestOptions)
            .then(response => response.text())
            .then(result => {
                setLoading(false);
                const data = JSON.parse(result);
                setResData(Object.values(data));
                setFind(true)

            })
            .catch(error => console.log('error', error));
    }

    const handleStarSubmit = (event, resId) => {
        event.preventDefault();
        setLoading(true)
        const formData = new FormData(event.target);
        const stars = formData.get('stars');

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ resId: resId, giveStar: stars })
        };

        fetch(url+"/api/ngo/giveStars", requestOptions)
            .then(response => response.text())
            .then(result => {
                setLoading(false);
                const data2 = JSON.parse(result);
                console.log(data2);
                if (data2.resCode === 200) {
                    toast.success(
                        `${data2.message}`,
                        {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 1500,
                        }
                    );
                }
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

    const sendRevert = (email,mobileNumber)=>{
        setLoading(true)
        const data = {
            email,
            mobileNumber
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        fetch(url+"/api/ngo/sendRevert", requestOptions)
            .then(response => response.text())
            .then(result => {
                setLoading(false);
                const data2 = JSON.parse(result);
                console.log(data2);
                if (data2.resCode === 200) {
                    toast.success(
                        `${data2.message}`,
                        {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 1500,
                        }
                    );
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <>
            <div className="bg-image min-h-screen">
                <div className="flex flex-col justify-between items-end pt-1 px-5 text-white">
                    <button className="text-lg font-medium border py-2 px-4 rounded-lg bg-white text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
                <div className="flex flex-col items-center">
                    <button className="text-2xl border mt-8 py-3 px-8 mx-auto rounded-lg bg-[#09cc7f] text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition-colors" onClick={() => router.push('/upload-work')}>
                        Upload Work
                    </button>
                    <button className="text-[20px] mt-5 border py-2 px-2 mx-auto rounded-lg bg-black text-white " onClick={() => router.push('/ngo-profile')}>Your Profile</button>
                        
                    <button className="text-2xl border mt-5 py-3 px-8 mx-auto rounded-lg bg-[#09cc7f] text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition-colors" onClick={() => router.push('/your-work')}>
                        Your Work
                    </button>
                    
                    <div className="my-5 mt-10 pt-3 text-center rounded-2xl shadow-xl mx-auto md:w-1/2 flex flex-col items-center font-epilogue bg-[#ecfff7]">
                        <div className="flex flex-col">
                            <label>
                                Select your Area:
                                <span className="text-red-500 font-bold my-2">
                                    *
                                </span>
                            </label>
                            <input
                                type="text"
                                className="border rounded px-4 py-2"
                                placeholder="Enter your Area"
                                name="area"
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                required
                            />
                        </div>
                        <button className="my-5 border text-[20px] py-2 px-2 rounded-lg bg-[#09cc7f] text-white" onClick={handleSubmit}>
                            {loading ? (
                                <FaSpinner className="animate-spin" />
                            ) : (
                                <span>
                                    Find Restaurants!
                                </span>
                            )}
                        </button>
                    </div>
                </div>
                {find && (
                    <div className="w-[70%] pb-20 mx-auto text-center">
                        {
                            resData.length > 0 ? (
                                resData.map((item) => (
                                    <div className="font-epilogue border p-2 rounded-lg shadow-xl grid grid-cols-2 items-center mx-5 mb-20 bg-white max-[1024px]:block text-center break-all" key={item.uuid}>
                                        <div className="h-[250px] flex justify-center">
                                            <img src={item.fileLink} alt="food" className="h-[230px]" />
                                        </div>
                                        <div>
                                            <div className="mt-4 font-bold text-xl">{item.resName}</div>
                                            <div className="mt-2">{item.resAddress}</div>
                                            <div className="mt-2">Quantity: {item.foodQuantity} Kg</div>
                                            <div className="mt-2">Type: {item.foodType}</div>
                                            <div className="mt-2">{item.stars} ⭐</div>
                                            <form
                                                onSubmit={(event) => handleStarSubmit(event, item.resId)}
                                            >
                                                <select name="stars" className="border rounded-md p-1" defaultValue={0}>
                                                    <option value={0} disabled>Select a number</option>
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={3}>3</option>
                                                    <option value={4}>4</option>
                                                    <option value={5}>5</option>
                                                </select>
                                                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mt-2">
                                                    {loading ? (
                                                        <FaSpinner className="animate-spin" />
                                                    ) : (
                                                        <span>
                                                            Give Review
                                                        </span>
                                                    )}
                                                </button>
                                            </form>
                                            <p className="mt-2">Email: {item.resEmail}</p>
                                            <p className="mt-2">Mobile Number: {item.resMobileNumber}</p>
                                            <button onClick={()=>sendRevert(item.resEmail,item.resMobileNumber)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 my-4 rounded mt-2">
                                                Contact Restaurant
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-[30px]">No Restaurants in your Area Currently</div>
                            )}
                    </div>
                )}
            </div>
        </>
    )
}

export default NgoDashboard;
