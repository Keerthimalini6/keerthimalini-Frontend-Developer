import React, { useState } from 'react';
import axios from 'axios';
import logo from "../Images/logo.svg"
import "../Styles/capsule.css"
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
} from '@chakra-ui/react'

export const Capsule = () => {
    const [status, setStatus] = useState('');
    const [originalLaunch, setOriginalLaunch] = useState('');
    const [type, setType] = useState('');
    const [capsuleData, setCapsuleData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [counter, setCouter] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const fetchData = async () => {
        try {
            const queryParams = {
                status,
                original_launch: originalLaunch,
                type,
            };
            const response = await axios.get('https://backend-spacex.vercel.app/capsule', {
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
                <div style={{ padding: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <img src={logo} alt="" className='logo' />
                    <p className='nav-p'>Falcon</p>
                    <p className='nav-p'>Falcon Heavy</p>
                    <p className='nav-p'>Dragon</p>
                    <p className='nav-p'>Starship</p>
                    <p className='nav-p'>Rideshare</p>
                    <p className='nav-p'>Starshield</p>
                </div>
                <h2 className='dragon-p'>DRAGON</h2>
                <p style={{ textAlign: 'center', }}>SENDING HUMANS AND CARGO INTO SPACE</p>
            </div>
            <div>
                <ScrollTrigger onEnter={() => setCouter(true)} onExit={() => setCouter(false)}>
                    <div style={{ display: "flex", justifyContent: "space-around" }} >
                        <div className='counter-div'>
                            <h1>
                                {counter && <CountUp className='counter' start={0} end={39} duration={5} delay={0} />}
                            </h1>
                            <span className='counter-text'>TOTAL LAUNCHES</span>
                        </div>
                        <div className='counter-div'>
                            <h1>
                                {counter && <CountUp className='counter' start={0} end={35} duration={5} delay={0} />}
                            </h1>
                            <span className='counter-text'> VISITS TO THE ISS</span>
                        </div>
                        <div className='counter-div'>
                            <h1>
                                {counter && <CountUp className='counter' start={0} end={17} duration={5} delay={0} />}
                            </h1>
                            <span className='counter-text'>TOTAL REFLIGHTS</span>
                        </div>
                    </div>
                </ScrollTrigger >
            </div>
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
                                <option value="" style={{ backgroundColor: 'black', color: 'white' }}>
                                    Select the status
                                </option>
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
                            <select
                                id="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="border border-white rounded px-4 py-2 w-full bg-black text-white"
                                style={{ color: 'white' }}
                            >
                                <option value="" style={{ backgroundColor: 'black', color: 'white' }}>
                                    Select a type
                                </option>
                                <option value="Dragon 1.0" style={{ backgroundColor: 'black', color: 'white' }}>
                                    Dragon 1.0
                                </option>
                                <option value="Dragon 1.1" style={{ backgroundColor: 'black', color: 'white' }}>
                                    Dragon 1.1
                                </option>
                                <option value="Dragon 2.0" style={{ backgroundColor: 'black', color: 'white' }}>
                                    Dragon 2.0
                                </option>
                            </select>
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
                                <div key={id} style={{ borderColor: "#767676" }} className=" border p-4 rounded bubble" onClick={onOpen}>
                                    <p className="font-bold" style={{ textTransform: "uppercase" }}>{ele.capsule_id} - {ele.capsule_serial}</p>
                                    <p>{ele.details}</p>

                                    <Modal isOpen={isOpen} onClose={onClose} isCentered>
                                        <ModalContent>
                                            <ModalHeader style={{ textTransform: "uppercase" }}>{ele.capsule_id}</ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody>
                                                <p>Original launch : <span style={{ color: "#767676" }}>{ele.original_launch}</span></p>
                                                <p>Status : <span style={{ color: "#767676" }}>{ele.status}</span></p>
                                                <p>Type : <span style={{ color: "#767676" }}>{ele.type}</span></p>
                                                {ele.missions.length === 0 ? " " : <div>
                                                    <p>Missions : <span style={{ color: "#767676" }}>{ele.missions[0].name}</span></p>
                                                    <p>Flight : <span style={{ color: "#767676" }}>{ele.missions[0].flight}</span></p>
                                                </div>}
                                            </ModalBody>

                                            <ModalFooter>
                                                <Button backgroundColor="#2c2d31" color="white" mr={3} onClick={onClose}>
                                                    Close
                                                </Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                </div>

                            ))}
                        </div>
                        {/* Pagination */}
                        <div style={{ paddingBottom: "30px" }} className="flex justify-center mt-4 w-1/2 text-left">
                            {Array.from({ length: Math.ceil(capsuleData.length / itemsPerPage) }).map((_, index) => (
                                <Button
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    backgroundColor={currentPage === index + 1 ? "#19191b" : "gray"}
                                    className={`  mx-1 px-2 py-1 rounded`}
                                >
                                    {index + 1}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};
