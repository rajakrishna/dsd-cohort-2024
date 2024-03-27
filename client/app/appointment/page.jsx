'use client'

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { mockServicesData } from "../mockData/mockGetServicesApi";
import { mockTimeSlotsData } from "../mockData/mockGetTimeSlotsApi";
import { timeSlots, statesList } from "@/constants";

export default function AppointmentPage() {

  const [service, setService] = useState('')
  const [startDate, setStartDate] = useState(new Date().toLocaleDateString())
  const [appointment, setAppointment] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')

  const serviceInputHandler = (e) => {
    setService(e.target.value)
  }

  const appointmentInputHandler = (e) => {
    setAppointment(e.target.value)
  }

  const firstNameInputHandler = (e) => {
    setFirstName(e.target.value)
  }

  const lastNameInputHandler = (e) => {
    setLastName(e.target.value)
  }

  const emailInputHandler = (e) => {
    setEmail(e.target.value)
  }

  const phoneInputHandler = (e) => {
    setPhone(e.target.value)
  }

  const stateInputHandler = (e) => {
    setState(e.target.value)
  }

  const cityInputHandler = (e) => {
    setCity(e.target.value)
  }

  const zipInputHandler = (e) => {
    setZip(e.target.value)
  }

  return (
  <div className="flex flex-row p-5">
    <form className='flex-1 pr-10'>
      <select className="select select-bordered w-full max-w-xs" onChange={serviceInputHandler}>
        <option disabled selected>Services</option>
        {mockServicesData.map(service => <option key={service.id}>{service.name}</option>)}
      </select>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">Service Date - {startDate}</div>
          <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-white text-primary-content">
            <div className="card-body">
            <h3 className="card-title">Please select the date</h3>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date.toLocaleDateString())} />
          </div>
        </div>
      </div>
      <select className="select select-bordered w-full max-w-xs" onChange={appointmentInputHandler}>
        <option disabled selected>Appointment Time Slots</option>
        {mockTimeSlotsData.TS79 && <option>{timeSlots.TS79}</option>}
        {mockTimeSlotsData.TS911 && <option>{timeSlots.TS911}</option>}
        {mockTimeSlotsData.TS111 && <option>{timeSlots.TS111}</option>}
        {mockTimeSlotsData.TS13 && <option>{timeSlots.TS13}</option>}
        {mockTimeSlotsData.TS35 && <option>{timeSlots.TS35}</option>}
        {mockTimeSlotsData.TS57 && <option>{timeSlots.TS57}</option>}
      </select>
       <input type="text" placeholder='First Name' className="input input-bordered w-full max-w-xs" onChange={firstNameInputHandler}/>
       <input type="text" placeholder='Last Name' className="input input-bordered w-full max-w-xs" onChange={lastNameInputHandler}/>
       <input type="text" placeholder='Email' className="input input-bordered w-full max-w-xs" onChange={emailInputHandler}/>
       <input type="text" placeholder='Phone Number' className="input input-bordered w-full max-w-xs" onChange={phoneInputHandler}/>
       <select className="select select-bordered w-full max-w-xs" onChange={stateInputHandler}>
        <option disabled selected>State</option>
        {statesList.map(state => <option key={state.abbreviation}>{state.name}</option>)}
      </select>
       <input type="text" placeholder='City' className="input input-bordered w-full max-w-xs" />
       <input type="text" placeholder='Zipcode' className="input input-bordered w-full max-w-xs" />
    </form>
      <div className="flex-1 pl-5  border-yellow-200">
        <h2>Appointment Summary</h2>
        <p>Name: {firstName + ' ' + lastName}</p>
        <p>Phone number: {phone}</p>
        <p>Selected service: {service}</p>
        <p>Selected date: {startDate}</p>
        <p>Selected time: {appointment}</p>
      </div>
  </div>
  );
}
