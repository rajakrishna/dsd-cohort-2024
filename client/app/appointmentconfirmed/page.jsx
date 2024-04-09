"use client";
import { mockData } from "../utility/mockData/mockAppointmentApi";
import { timeSlots } from "@/constants";
import { formatDate } from "../utility/formatDateUtil";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
export default function AppointmentConfirmationPage() {
  const searchParams = useSearchParams();
  const appointment = searchParams.get("appointment");

  let appointmentData = { day: "no day", timeSlot: "no timeslot" };
  let confirmId = "no id";
  let customer = { name: "no name" };

  if (appointment != null && appointment != "undefined") {
    const { appointmentInfo, confirmationId, customerInfo } =
      JSON.parse(appointment);
    appointmentData = appointmentInfo;
    confirmId = confirmationId;
    customer = customerInfo;
  }

  //   console.log("appointment at confirm", appointment);
  return (
    <div className="card flex items-center bg-white p-8 rounded-none">
      <div className="card-body items-center border-black border-2 rounded-lg">
        <h1 className="card-title">Your booking is confirmed</h1>
        <p>See you soon {customer.name}</p>
        {/* <p>Service Name</p> */}
        <p>Confirmation Id: {confirmId}</p>
        <p>Date:{formatDate(appointment.day)}</p>
        <p>Time: {timeSlots[appointment.timeSlot]}</p>
        <div className="card-actions justify-end">
          <Link href={"/appointment"}>
            <button className="btn bg-green-800">Book a new appointment</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
