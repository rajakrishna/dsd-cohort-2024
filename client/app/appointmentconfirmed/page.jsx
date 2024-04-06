import { mockData } from "../utility/mockData/mockAppointmentApi";
import { timeSlots } from "@/constants";
import { formatDate } from "../utility/formatDateUtil";
import Link from "next/link";
export default function AppointmentConfirmationPage() {
    return (
        <div className="card flex items-center bg-white p-8 rounded-none">
            <div className="card-body items-center border-black border-2 rounded-lg">
                <h1 className="card-title">Your booking is confirmed</h1>
                <p>Service Name</p>
                <p>Confirmation Id: {mockData.confirmationID}</p>
                <p>Date: {formatDate(mockData.day)}</p>
                <p>Time: {timeSlots[mockData.timeSlot]}</p>
                <div className="card-actions justify-end">
                    <Link href={"/appointment"}>
                        <button className="btn bg-green-800">Book a new appointment</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}