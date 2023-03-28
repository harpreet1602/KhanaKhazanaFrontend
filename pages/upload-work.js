import { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/router';
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const UploadWork = () => {
    const router = useRouter()

    const [ngoId, setNgoId] = useState('')
    const [loading, setLoading] = useState(false)

    const [selectedFile, setSelectedFile] = useState(null);
    const [quantity, setQuantity] = useState('')
    // const url = "https://khanakhazana-backend.onrender.com";
    const url = "http://localhost:5000";

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)

        var formdata = new FormData();
        formdata.append("ngoId", ngoId);
        formdata.append("myFile", selectedFile);
        formdata.append("foodQuantity", quantity);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch(url+"/api/ngo/ngoFiles", requestOptions)
            .then(response => response.text())
            .then(result => {
                setLoading(false)
                const data = JSON.parse(result);
                toast.success(
                    "Work Uploaded Successfully!",
                    {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1500,
                    }
                );
                router.push('/ngo-dashboard')
                console.log(data)
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        setNgoId(localStorage.getItem('ngoId'));
    }, [])

    return (
        <>
            <div className="bg-donation min-h-screen pt-10">
                <div className='text-center border mx-auto md:w-1/2 flex flex-col items-center font-epilogue bg-white rounded-lg shadow-lg'>
                    <div className="absolute top-2 left-2">
                        <button className="text-[20px] bg-black py-2 px-2 mx-auto rounded-lg hover:text-[#aae9d0] text-white" onClick={() => router.push('/ngo-dashboard')}>
                            Back to Dashboard
                        </button>
                    </div>
                    <h1 className='text-[30px] text-[#09cc7f] font-bold py-6'>Upload the Work!</h1>
                    <form
                        className="flex flex-col justify-center space-y-5 md:w-[80%] w-full p-7"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-col my-2">
                            <label className='text-gray-700'>
                                Upload Work Image:
                                <span className="text-red-500 font-bold">
                                    *
                                </span>
                            </label>
                            <input
                                id="fileUpload"
                                type="file"
                                accept="image/x-png,image/gif,image/jpeg"
                                className="block w-full p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer shadow"
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col my-2">
                            
                            <div className="flex flex-col my-5">
                                <label className='text-gray-700'>
                                    Food Quantity (in Kgs):
                                    <span className="text-red-500 font-bold">
                                        *
                                    </span>
                                </label>
                                <input
                                    type="number"
                                    className="border rounded px-4 py-2"
                                    placeholder="Enter the food quantity"
                                    name="quantity"
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(e.target.value)
                                    }
                                    onWheel={(e) => e.target.blur()}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            {loading ? (
                                <FaSpinner className="animate-spin" />
                            ) : (
                                <button
                                    type="submit"
                                    className="py-1 px-7 text-white font-bold bg-[#09cc7f] border rounded hover:text-[#09cc7f] hover:bg-white"
                                >
                                    <span>Upload</span>
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UploadWork;