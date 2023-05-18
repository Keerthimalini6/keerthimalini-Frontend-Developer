import React, { useState } from 'react';
import axios from 'axios';
import logo from "../Images/logo.svg"
import "../Styles/capsule.css"
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";

export const Capsule = () => {
    const [status, setStatus] = useState('');
    const [originalLaunch, setOriginalLaunch] = useState('');
    const [type, setType] = useState('');
    const [capsuleData, setCapsuleData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [counter, setCouter] = useState(false)

    const fetchData = async () => {
        try {
            const queryParams = {
                status,
                original_launch: originalLaunch,
                type,
            };
            const response = await axios.get('http://localhost:8080/capsule', {
                params: queryParams,
            });

            console.log('Capsule data:', response.data);
            setCapsuleData(response.data);
            setStatus("")
            setOriginalLaunch("")
            setType("")
        } catch (error) {
            console.error('Error fetching capsule data:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchData();
    };
    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = capsuleData ? capsuleData.slice(indexOfFirstItem, indexOfLastItem) : [];

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div style={{ color: 'white', backgroundColor: "black" }} >
            <div style={{ backgroundImage: 'url(https://www.spacex.com/static/images/backgrounds/dragon_feature.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
                <div style={{ padding: "10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <img src={logo} alt="" className='logo' />
                    <p className='nav-p'>Falcon</p>
                    <p className='nav-p'>Falcon Heavy</p>
                    <p className='nav-p'>Dragon</p>
                    <p className='nav-p'>Starship</p>
                    <p className='nav-p'>Rideshare</p>
                    <p className='nav-p'>Starshield</p>
                </div>
                <h2 style={{ fontSize: "85px", textAlign: 'center', fontWeight: "700", paddingTop: "170px" }}>DRAGON</h2>
                <p style={{ textAlign: 'center', }}>SENDING HUMANS AND CARGO INTO SPACE</p>
            </div>
            <ScrollTrigger onEnter={() => setCouter(true)} onExit={() => setCouter(false)}>
                <div style={{ display: "flex", justifyContent: "space-around" }} >
                    <div className="counter" style={{ color: "white", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <h1 style={{ color: "#767676" }}>
                            {counter && <CountUp style={{ fontSize: "50px", fontWeight: "400" }} start={0} end={39} duration={8} delay={0} />}
                        </h1>
                        <span style={{ fontSize: "1.2rem" }}>TOTAL LAUNCHES</span>
                    </div>
                    <div className="counter" style={{ color: "white", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <h1 style={{ color: "#767676" }}>
                            {counter && <CountUp style={{ fontSize: "50px", fontWeight: "400" }} start={0} end={35} duration={8} delay={0} />}
                        </h1>
                        <span style={{ fontSize: "1.2rem" }}> VISITS TO THE ISS</span>
                    </div>
                    <div className="counter" style={{ color: "white", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <h1 style={{ color: "#767676" }}>
                            {counter && <CountUp style={{ fontSize: "50px", fontWeight: "400" }} start={0} end={17} duration={8} delay={0} />}
                        </h1>
                        <span style={{ fontSize: "1.2rem" }}>TOTAL REFLIGHTS</span>
                    </div>
                </div>
            </ScrollTrigger >
            <div style={{ backgroundImage: 'url(https://www.spacex.com/static/images/dragon/desktop/DragonTrunk_Render_Desktop.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
                <div style={{ paddingTop: "70px" }}>
                    <form onSubmit={handleSubmit} className="space-y-4 w-1/2 text-left mx-3 ">
                        <div >
                            <label htmlFor="status" className="block mb-2 font-medium">
                                Status:
                            </label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="border border-white rounded px-4 py-2 w-full bg-black text-white"
                                style={{ color: 'white' }}
                            >
                                <option value="active" style={{ backgroundColor: 'black', color: 'white' }}>
                                    Active
                                </option>
                                <option value="retired" style={{ backgroundColor: 'black', color: 'white' }}>
                                    Retired
                                </option>
                                <option value="destroyed" style={{ backgroundColor: 'black', color: 'white' }}>
                                    Destroyed
                                </option>
                                <option value="unknown" style={{ backgroundColor: 'black', color: 'white' }}>
                                    Unknown
                                </option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="originalLaunch" className="block mb-2 font-medium">
                                Original Launch:
                            </label>
                            <input
                                type="text"
                                id="originalLaunch"
                                value={originalLaunch}
                                onChange={(e) => setOriginalLaunch(e.target.value)}
                                className="border border-white rounded px-4 py-2 w-full bg-black text-white"
                            />
                        </div>
                        <div>
                            <label htmlFor="type" className="block mb-2 font-medium">
                                Type:
                            </label>
                            <input
                                type="text"
                                id="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="border border-white rounded px-4 py-2 w-full bg-black text-white"
                            />
                        </div>
                        <button
                            type="submit"
                            className="border-2 border-white rounded px-4 py-2 w-full bg-black text-white"
                        >
                            Search
                        </button>
                    </form>
                </div>
                {capsuleData && (
                    <div className="mt-8">
                        <h3 className="text-lg font-bold mb-4">Results</h3>
                        <div className="grid grid-cols-2 gap-4 w-1/2 text-left">
                            {currentItems.map((ele, id) => (
                                <div key={id} style={{ borderColor: "#767676" }} className="border p-4 rounded">
                                    <p className="font-bold" style={{ textTransform: "uppercase" }}>{ele.capsule_id} - {ele.capsule_serial}</p>
                                    <p>{ele.details}</p>
                                    <p>Original launch : <span style={{ color: "#767676" }}>{ele.original_launch}</span></p>
                                    <p>Status : <span style={{ color: "#767676" }}>{ele.status}</span></p>
                                    <p>Type : <span style={{ color: "#767676" }}>{ele.type}</span></p>
                                    {ele.missions.length !== 0 ? <div><p>Missions : <span style={{ color: "#767676" }}>{ele.missions[0].name}</span></p>
                                        <p>Flight : <span style={{ color: "#767676" }}>{ele.missions[0].flight}</span></p></div> : ""}

                                </div>
                            ))}
                        </div>
                        {/* Pagination */}
                        <div className="flex justify-center mt-4 w-1/2 text-left">
                            {Array.from({ length: Math.ceil(capsuleData.length / itemsPerPage) }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    className={` border border-white mx-1 px-2 py-1 rounded ${currentPage === index + 1 ? "bg-black-500 text-white" : "bg-gray-300 text-gray-700"
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};
