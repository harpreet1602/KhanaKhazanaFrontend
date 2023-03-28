import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
// import { Link } from "react-router-dom";

const Signup = () => {
    const router = useRouter()

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('');
    // const url = "https://khanakhazana-backend.onrender.com";
    const url = "http://localhost:5000";

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        address: '',
        area: '',
        password: '',
        userType: ''
    });

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
        if (event.target.name === 'email') {
            setEmail(JSON.stringify(event.target.value));
        }
        if (event.target.name === 'userType') {
            setUserType(JSON.stringify(event.target.value));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const raw = JSON.stringify(formData);

        setLoading(true);
        const requestOptions = {
            method: 'POST',
            body: raw,
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        };

        fetch(url+"/api/user/signup", requestOptions)
            .then(response => response.text(),)
            .then(result => {
                const data = JSON.parse(result);
                setLoading(false);
                if (data.resCode === 200) {
                    toast.success(
                        "Account Created Successfully",
                        {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 1500,
                        }
                    );
                    localStorage.setItem("userType", userType);
                    localStorage.setItem("email", email);
                    router.push('/login')
                }
                else {
                    toast.error(
                        `${data.message}`,
                        {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 1500,
                        }
                    );
                }
            })
            .catch(error => console.log('error', error));
    };

    useEffect(() => {
        localStorage.setItem("userType", formData.userType)
    }, [])

    return (
        <>
        {/* <Link to="/">signup</Link> */}
            <div className="bg-login min-h-screen py-10">
                <div className='text-center border mx-auto md:w-[38%] w-90% flex flex-col items-center font-epilogue bg-white rounded-xl'>
                    <img src="/temporary/assets/img/logo/logo.png" alt="logo" />
                    <h1 className='text-[30px] mt-5'>SIGN UP</h1>
                    <form
                        className="flex flex-col justify-center space-y-5 w-full rounded-lg p-7"
                        onSubmit={(event) => handleSubmit(event)}
                    >
                        <div className="flex flex-col">
                            <label>
                                Name:
                                <span className="text-red-500 font-bold">
                                    *
                                </span>
                            </label>
                            <input
                                type="text"
                                className="border rounded px-4 py-2"
                                placeholder="Enter your company name"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label>
                                Email:
                                <span className="text-red-500 font-bold">
                                    *
                                </span>
                            </label>
                            <input
                                type="email"
                                className="border rounded px-4 py-2"
                                placeholder="Enter your email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label>
                                Address:
                                <span className="text-red-500 font-bold">
                                    *
                                </span>
                            </label>
                            <input
                                type="text"
                                className="border rounded px-4 py-2"
                                placeholder="Enter your Address"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label>
                                Area:
                                <span className="text-red-500 font-bold">
                                    *
                                </span>
                            </label>
                            <input
                                type="text"
                                className="border rounded px-4 py-2"
                                placeholder="Enter your Area"
                                id="area"
                                name="area"
                                value={formData.area}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label>
                                Phone Number:
                                <span className="text-red-500 font-bold">
                                    *
                                </span>
                            </label>
                            <input
                                type="number"
                                className="border rounded px-4 py-2"
                                placeholder="Enter your phone number"
                                id="mobileNumber"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleInputChange}
                                onWheel={(e) => e.target.blur()}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label>
                                User Type:
                                <span className="text-red-500 font-bold">
                                    *
                                </span>
                            </label>
                            <div className="flex flex-row items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="Res"
                                        name="userType"
                                        value="Res"
                                        checked={formData.userType === 'Res'}
                                        onChange={handleInputChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor="restaurant" className="text-sm font-medium">Restaurant</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="ngo"
                                        name="userType"
                                        value="NGO"
                                        checked={formData.userType === 'NGO'}
                                        onChange={handleInputChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor="ngo" className="text-sm font-medium">NGO</label>
                                </div>
                                {/* <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="Public"
                                        name="userType"
                                        value="Public"
                                        checked={formData.userType === 'Public'}
                                        onChange={handleInputChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor="public" className="text-sm font-medium">Public</label>
                                </div> */}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label>
                                Password:
                                <span className="text-red-500 font-bold">
                                    *
                                </span>
                            </label>
                            <input
                                type="password"
                                className="border rounded px-4 py-2"
                                placeholder="Enter your password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="flex justify-center">
                            {loading ? (
                                <FaSpinner className="animate-spin" />
                            ) : (
                                <button
                                    type="submit"
                                    className="py-1 px-7 text-white font-bold bg-[#09cc7f] border rounded hover:text-[#09cc7f] hover:bg-white"
                                >
                                    <span>Sign Up</span>
                                </button>
                            )}
                        </div>
                    </form>
                    <p className='mb-10'>Already have an account? <span className=' text-blue-800 cursor-pointer' onClick={() => router.push('/login')}>LogIn</span></p>
                </div>
            </div>
        </>
    )
}

export default Signup;
