"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useGetAppointments from "@/app/_hooks/appointments-api/useGetAppointments";
import { appointmentAttributes } from "@/constants";

export default function AppointmentsPage() {
    const [startDate, setStartDate] = useState(new Date());
    //const { data: appointmentsList, error: appointmentsListError } = useGetAppointments();
    //Mock data
    const appointmentsList = [{
        name: 'michelle',
        time: '7-9',
        service: 'service1',
        partsNeeded: [{name: 'part1', quantity: 20, threshold: 4}, {name: 'part2', quantity: 40, threshold: 8}]
    }]
    return (
        <>
            <DatePicker className="bg-white border-black border-2" selected={startDate} onChange= {(date) => setStartDate(date)} /> 
            <div className="w-4/5 border-2 border-black m-4 p-4 rounded-xl">
                <table className="table text-center">
                    {/* head */}
                    <thead>
                        <tr className="text-black border-2 border-black rounded-xl">
                            {appointmentAttributes.map((item, index) => <th key={index}>{item}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {appointmentsList.map((appointment, index) => {
                            return (
                            <tr key={index} className="border-0">
                                <td>{appointment.name}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.service}</td>
                                <td>{appointment.partsNeeded.map((part) => part.name)}</td>
                            </tr>
                        )})}
                    </tbody>
                </table>
            </div>
        </>
        
    );
}