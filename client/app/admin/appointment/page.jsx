"use client";

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useGetAppointments from "@/app/_hooks/appointments-api/useGetAppointments";
import useGetServices from "@/app/_hooks/service-api/useGetServices";
import { timeSlots } from "@/constants";
//import { appointmentsList } from "@/app/utility/mockData/mockGetAppointments"
import { appointmentAttributes } from "@/constants";
import { formatDateWithNoSlash } from "@/app/utility/formatDateWithNoSlash";
export default function AppointmentsPage() {
    const [startDate, setStartDate] = useState(new Date().toLocaleDateString());
    const { data: appointmentsList, error: appointmentsListError } = useGetAppointments(formatDateWithNoSlash(startDate));
    const { data: serviceList, error: serviceListError } = useGetServices();
   // const [currentPage, setCurrentPage] = useState(1);
    const appointmentsPerPage = 5;
    
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // const indexOfLastAppointment = currentPage * appointmentsPerPage;
    // const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
    // const currentAppointments = appointmentsList.slice(indexOfFirstAppointment, indexOfLastAppointment);
    // const totalPages = Math.ceil(appointmentsList.length / appointmentsPerPage);

    return (
        <>
            <div className="date-picker-container">
                <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date.toLocaleDateString())}
                className="bg-white border-black border-2 rounded-lg px-3 py-2 outline-none focus:ring"
                />
            </div>
            <div className="w-full border-2 border-black m-4 p-6 rounded-xl">
                <h1 className="text-center pb-6 font-bold">Appointments for {startDate}</h1>
                <table className="table text-center">
                    <thead>
                        <tr className="text-black border-2 border-black rounded-xl">
                            {appointmentAttributes.map((item, index) => <th className="text-gray-500 uppercase" key={index}>{item}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {appointmentsList ? appointmentsList.map((appointment, index) => {
                            return (
                            <tr key={index} className="border-gray-300 text-black font-medium">
                                <th>{indexOfFirstAppointment + index + 1}</th>
                                <td>{appointment.name}</td>
                                <td>{timeSlots[appointment.time]}</td>
                                <td>{serviceList.find((service) => service.id === appointment.service)}</td>
                                <td>{appointment.partsNeeded.map((part) => part.name).join(', ')}</td>
                            </tr>
                        )}) : console.log('appointmentslist error',appointmentsListError )}
                    </tbody>
                </table>
                {/* <div className="flex items-center justify-between mt-4">
                    <div className="flex-1">
                        {currentPage > 1 && (<button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="mr-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg flex items-center justify-center">Previous</button>)}
                    </div>
                    <div className="flex flex-1 justify-end">
                        {currentPage < totalPages && (<button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="self-end ml-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg flex justify-center">Next</button>)}
                    </div>
                </div> */}
            </div>
        </>       
    );
}