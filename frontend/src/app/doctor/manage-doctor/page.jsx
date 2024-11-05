'use client';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const ManageDoctor = () => {
    const runOnce = useRef(false); // Prevent fetching multiple times
    const [doctorList, setDoctorList] = useState([]);

    // Fetch all doctors
    const fetchDoctors = async () => {
        try {
            const res = await axios.get('http://localhost:5000/doctor/getall');
            console.table(res.data);
            setDoctorList(res.data);
        } catch (error) {
            console.error('Error fetching doctor data:', error);
        }
    };

    // Delete doctor by ID
    const handledelete =  (id) => {
         axios.delete(`http://localhost:5000/doctor/delete/${id}`)
         .then(() => {
            toast.success('Doctor deleted successfully');
          setDoctorList(doctor.filter(doctor => doctor._id !==id));
         })
         .catch(()=>{
            toast.error('failed to delete doctor');
         });
    };

    // Fetch doctors on first render
    useEffect(() => {
        if (!runOnce.current) {
            fetchDoctors();
            runOnce.current = true;
        }
    }, []);

    // Function to display doctors in a table format
    const displayDoctors = () => {
        return (
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500">#</th>
                        <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500">Specialization</th>
                        <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {doctorList.map((doctor, index) => (
                        <tr key={doctor._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doctor.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doctor.specialization}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <td className="size-px whitespace-nowrap">
                                        <div className="px-6 py-3">
                                            <span className="text-sm text-gray-500 dark:text-neutral-500">
                                               {new Date(doctor.createdAt).toDateString()}&nbsp;
                                            </span>
                                        </div>
                                    </td>
                                    <td className="size-px whitespace-nowrap">
                                        <div className="px-6 py-1.5">
                                            <Link
                                                className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                                                href={"/Updatedoctor/"+doctor._id}
                                            >
                                                Edit
                                            </Link>
                                        </div>
                                    </td>
                                <button 
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    onClick={() => handledelete(doctor._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div className='max-w-[80%] mx-auto'>
            <h1 className='text-center font-bold text-3xl'>Manage Doctors</h1>
            <br />
            {displayDoctors()} {/* Display the table */}
        </div>
    );
};

export default ManageDoctor;
