'use client'

import useGetAppointments from "../../_hooks/appointments-api/useGetAppointments";
import { mockData } from "../../utility/mockData/mockGetAppointmentsApi";
import { timeSlots } from "../../../constants.js";
import { useState, useEffect } from "react";

export default function AdminPage() {

    const [ currentPage, setCurrentPage ] = useState(1);
    const rowsPerPage = 12

    let indexOfLastRow = currentPage * rowsPerPage;
    let indexOfFirstRow = indexOfLastRow - rowsPerPage;
    let displayedRows = mockData.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(mockData.length / rowsPerPage);

    const nextPage = () => {
        setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev))
    }

    const prevPage = () => {
        setCurrentPage(prev => (prev > 1 ? prev - 1 : prev))
    }

    let date = new Date().toLocaleDateString();

    const formattedDate = date.split("/");

    let [month, day, year] = formattedDate;
    if (month.length === 1) {
        month = "0" + month;
    }
    if (day.length === 1) {
        day = "0" + day;
    }
    const dateWithNoHyphens = month + day + year;

    const { data, error, isLoading } = useGetAppointments(dateWithNoHyphens);

    if (isLoading) {
        return (
        <div className="flex items-center justify-center min-h-screen">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      )
    };


    return (
        <div className="flex-1 flex flex-col justify-center items-center p-10">
            <div className="w-full max-w-full border-2 rounded-3xl border-black shadow-md py-20 h-auto px-20 overflow-auto">
                <h1 className='text-black text-center pb-10 font-bold'>Today's Appointments</h1>
                <table className=" text-black w-full min-w-full divide-y divide-gray-200">
                    <thead className='text-black w-full max-w-full border-2 border-black rounded-3xl bg-gray-50'>
                        <tr className='mb-7'>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parts Needed</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200 mt-4 overflow-scroll max-h-max'>
                       { displayedRows.map((app, index)=>{
                        return (
                        <tr className="hover">
                            <th className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{indexOfFirstRow + index + 1}</th>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.customerInfo}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{timeSlots[app.timeSlot]}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.confirmationNumber}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.customerId}</td>
                        </tr>
                        )
                       })}
                    </tbody>
                </table>
                <div className='flex text-blue-500 items-center justify-between pt-5'>
                    { !(currentPage === 1) ? <button onClick={prevPage} disabled={currentPage === 1} className='flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white mr-20'>Previous</button> : <div className="flex-1"></div>}
                    { !(currentPage === totalPages) ? <button onClick={nextPage} disabled={currentPage === totalPages} className='flex items-center justify-center px-4 h-10 ms-3 text-base font-medium text-white bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ml-20'>Next</button> : <div className="flex-1"></div>}
                </div>
            </div>
        </div>
    );
}