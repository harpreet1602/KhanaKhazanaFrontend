import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
    const router = useRouter()

    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthentcated] = useState(false);
    const [isNgo, setIsNgo] = useState(false);
    const [isRes, setIsRes] = useState(false);
    const [isPublic, setIsPublic] = useState(false);
    // const url = "https://khanakhazana-backend.onrender.com";
    const url = "http://localhost:5000";
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)

        const raw = JSON.stringify(formData);

        const requestOptions = {
            method: 'POST',
            body: raw,
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        };

        fetch(`${url}/api/user/login`, requestOptions)
            .then(response => response.text(),)
            .then(result => {
                const data = JSON.parse(result);
                setLoading(false);
                if (data.resCode === 200) {
                    localStorage.setItem("name", data.name);
                    localStorage.setItem("authToken", data.authToken);
                    localStorage.setItem("userId", data.userId);
                    console.log("userId", data.userId);
                    localStorage.setItem("authenticated", true);
                    if (data.userType === 'Res') {
                        router.push('/restaurant-dashboard')
                        localStorage.setItem("isRes", true)
                        localStorage.removeItem("isNgo")
                        localStorage.removeItem("isPublic")
                    } else if (data.userType === 'NGO') {
                        router.push('/ngo-dashboard')
                        localStorage.setItem("isNgo", true)
                        localStorage.removeItem("isRes")
                        localStorage.removeItem("isPublic")
                    } else if (data.userType === 'Public') {
                        router.push('/public-dashboard')
                        localStorage.setItem("isPublic", true)
                        localStorage.removeItem("isRes")
                        localStorage.removeItem("isNgo")
                    } 
                    console.log(data.message)
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
        setIsAuthentcated(localStorage.getItem('authenticated'))
        setIsRes(localStorage.getItem('isRes'))
        setIsNgo(localStorage.getItem('isNgo'))
        setIsPublic(localStorage.getItem('isPublic'))
    }, [])

    if (isAuthenticated) {
        if (isNgo) {
            router.push('/ngo-dashboard');
        }
        else if (isRes) {
            router.push('/restaurant-dashboard')
        }
        else if (isPublic) {
            router.push('/public-dashboard')
        }
    }

    return (
        <>
            <div className="bg-login min-h-screen pt-10">
                <div className='text-center border mx-auto md:w-[30%] w-[90%] flex flex-col items-center font-epilogue bg-white rounded-xl pt-5'>
                    <img src="/temporary/assets/img/logo/logo.png" alt="logo" />
                    <h1 className='text-[30px] mt-3'>Welcome</h1>
                    <p className="text-[14px] text-[#999999]">Please login to Continue</p>
                    <form
                        className="flex flex-col justify-center space-y-5 w-full rounded-lg p-7"
                        onSubmit={handleSubmit}
                    >
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
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
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
                            <span className="text-sm my-2 text-blue-800 cursor-pointer"
                            // onClick={() => router.push('/forgot_password')}
                            >
                                Forgot password?
                            </span>
                            <span className="text-sm my-2 text-blue-800 cursor-pointer"
                                onClick={() => router.push('/signup')}
                            >
                                Don&apos;t have an account?
                            </span>
                        </div>
                        <div className="flex flex-col">

                        </div>
                        <div className="flex justify-center">
                            {loading ? (
                                <FaSpinner className="animate-spin" />
                            ) : (
                                <button
                                    type="submit"
                                    className="py-1 px-7 text-white font-bold bg-[#09cc7f] border rounded hover:text-[#09cc7f] hover:bg-white"
                                >
                                    <span>LogIn</span>
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;
