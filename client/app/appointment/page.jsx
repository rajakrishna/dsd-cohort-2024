'use client'

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { mockServicesData } from "../mockData/mockGetServicesApi";
import { mockTimeSlotsData } from "../mockData/mockGetTimeSlotsApi";
import { timeSlots, statesList } from "@/constants";
import { router } from "next/navigation";

export default function AppointmentPage() {

  const [service, setService] = useState('')
  const [startDate, setStartDate] = useState(new Date().toLocaleDateString())
  const [appointment, setAppointment] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [apt, setApt] = useState('')
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

  const streetInputHandler = (e) => {
    setStreet(e.target.value)
  }

  const aptInputHandler = (e) => {
    setApt(e.target.value)
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

  const bookAppointment = () => {
console.log(startDate)
    const timeSlotKey = Object.keys(timeSlots).find(timeSlotKey => timeSlots[timeSlotKey] === appointment);
    const selectedService = mockServicesData.find(item => item.name === service);
    const formattedDate = startDate.split('/')
    let [month, day, year] = formattedDate
    if (month.length === 1) {
      month = '0' + month
    }
    if (day.length === 1) {
      day = '0' + day
    }
    const dateWithNoHyphens = month + day + year

    const data = {
      "appointmentInfo": { "day": dateWithNoHyphens, "timeSlot": timeSlotKey },
      "customerInfo": {
        "address": street + ' ' + apt,
        "name": firstName + ' ' + lastName,
        "phoneNumber": phone,
        "email": email,
        "serviceId": selectedService.id
      }
    }
    console.log(data)
    fetch(
      '/api/appointment',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    )
    .then(
      router.push('/appointmentconfirmed')
    )
    .catch(err => console.log(err))
  }

  return (
  <div className="flex flex-row min-h-screen w-full">
    <form className='flex-1 pr-2 grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-1 p-40'>
      <div className="col-span-1 md:col-span-2 lg:col-span-2">
        <select className="select select-bordered select-lg w-full" onChange={serviceInputHandler}>
          <option disabled selected>Services</option>
          {mockServicesData.map(service => <option key={service.id}>{service.name}</option>)}
        </select>
      </div>

      <div className="dropdown col-span-1">
        <div tabIndex={0} role="button" className="btn btn-lg w-full col-span-1 ">Service Date - {startDate}</div>
        <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-white text-primary-content">
          <div className="card-body">
            <h3 className="card-title">Please select the date</h3>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date.toLocaleDateString())} />
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <select className="select select-bordered select-lg w-full" onChange={appointmentInputHandler}>
          <option disabled selected>Appointment Time Slots</option>
          {mockTimeSlotsData.TS79 && <option>{timeSlots.TS79}</option>}
          {mockTimeSlotsData.TS911 && <option>{timeSlots.TS911}</option>}
          {mockTimeSlotsData.TS111 && <option>{timeSlots.TS111}</option>}
          {mockTimeSlotsData.TS13 && <option>{timeSlots.TS13}</option>}
          {mockTimeSlotsData.TS35 && <option>{timeSlots.TS35}</option>}
          {mockTimeSlotsData.TS57 && <option>{timeSlots.TS57}</option>}
        </select>
      </div>

       <input type="text" placeholder='First Name' className="input input-bordered w-full input-lg col-span-1" onChange={firstNameInputHandler}/>
       <input type="text" placeholder='Last Name' className="input input-bordered w-full input-lg col-span-1" onChange={lastNameInputHandler}/>
       <input type="text" placeholder='Email' className="input input-bordered w-full input-lg col-span-1" onChange={emailInputHandler}/>
       <input type="text" placeholder='Phone Number' className="input input-bordered input-lg w-full col-span-1" onChange={phoneInputHandler}/>
       <input type="text" placeholder='Street' className="input input-bordered input-lg w-full col-span-1" onChange={streetInputHandler}/>
       <input type="text" placeholder='Apt' className="input input-bordered input-lg w-full col-span-1" onChange={aptInputHandler}/>
       <select className="select select-bordered select-lg w-full" onChange={stateInputHandler}>
        <option disabled selected>State</option>
        {statesList.map(state => <option key={state.abbreviation}>{state.name}</option>)}
      </select>
       <input type="text" placeholder='City' className="input input-bordered input-lg w-full" />
       <input type="text" placeholder='Zipcode' className="input input-bordered input-lg w-full" />
    </form>
    <div className="flex-1 flex flex-col justify-center items-center p-5">
      <div className="w-full max-w-lg border-4 border-gray-300 shadow-md py-20 h-auto px-8">
        <h1 className='pb-6 font-bold text-3xl'>Appointment Summary:</h1>
        <p className='py-5 text-xl'>Name: {firstName + ' ' + lastName}</p>
        <p className='py-5 text-xl'>Phone number: {phone}</p>
        <p className='py-5 text-xl'>Selected service: {service}</p>
        <p className='py-5 text-xl'>Selected date: {startDate}</p>
        <p className='py-5 text-xl'>Selected time: {appointment}</p>
      </div>
      <div>
        <button className="btn btn-primary mt-5" onClick={bookAppointment}>Book Appointment</button>
      </div>
    </div>
  </div>
  );
}
