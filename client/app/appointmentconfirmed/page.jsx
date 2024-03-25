import { mockData } from "../api/mockAppointmentApi";
import { timeSlots } from "@/constants";
import Link from "next/link";
export default function AppointmentConfirmationPage() {
    const formatDate = (dateString) => {
        if(!dateString || dateString.length !== 8){
            return "Invalid date";
        }
        const year = parseInt(dateString.slice(4));
        const month = parseInt(dateString.slice(0, 2)) - 1;
        const day = parseInt(dateString.slice(2, 4));
        if (month < 0 || month > 11 || day < 1 || day > 31 || year < 1) {
            return "Invalid date";
        } else {
            const changedDate = new Date(year, month, day);
            return changedDate.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'});
        }
    }
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