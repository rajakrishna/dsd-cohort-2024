'use client';

import useGetAppointments from '../../_hooks/appointments-api/useGetAppointments';
import { mockData } from '../../utility/mockData/mockGetAppointmentsApi';
import { timeSlots } from '../../../constants.js';
import { useState, useEffect } from 'react';

export default function AdminPage() {
	const [currentPage, setCurrentPage] = useState(1);
	const rowsPerPage = 12;

	let indexOfLastRow = currentPage * rowsPerPage;
	let indexOfFirstRow = indexOfLastRow - rowsPerPage;
	let displayedRows = mockData.slice(indexOfFirstRow, indexOfLastRow);

	const totalPages = Math.ceil(mockData.length / rowsPerPage);

	const nextPage = () => {
		setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
	};

	const prevPage = () => {
		setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
	};

	let date = new Date().toLocaleDateString();

	const formattedDate = date.split('/');

	let [month, day, year] = formattedDate;
	if (month.length === 1) {
		month = '0' + month;
	}
	if (day.length === 1) {
		day = '0' + day;
	}
	const dateWithNoHyphens = month + day + year;

	const { data, error, isLoading } = useGetAppointments(dateWithNoHyphens);

	if (isLoading) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<span className='loading loading-bars loading-lg'></span>
			</div>
		);
	}

	return (
		<div className='flex flex-col justify-center items-center'>
			<h1 className='text-black text-center pb-6 font-bold text-2xl'>Today's Appointments</h1>
			<table className='table'>
				<thead>
					<tr className='mb-7'>
						{/* <th></th> */}
						<th>Name</th>
						<th>Time</th>
						<th>Service</th>
						<th>Parts Needed</th>
					</tr>
				</thead>
				<tbody>
					{displayedRows.map((app, index) => {
						return (
							<tr className='hover' id={index}>
								{/* <th>{indexOfFirstRow + index + 1}</th> */}
								<td>{app.customerInfo}</td>
								<td>{timeSlots[app.timeSlot]}</td>
								<td>{app.confirmationNumber}</td>
								<td>{app.customerId}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className='flex text-blue-500 items-center justify-between pt-5'>
				{!(currentPage === 1) ? (
					<button
						onClick={prevPage}
						disabled={currentPage === 1}
						className='flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white mr-20'
					>
						Previous
					</button>
				) : (
					<div className='flex-1'></div>
				)}
				{!(currentPage === totalPages) ? (
					<button
						onClick={nextPage}
						disabled={currentPage === totalPages}
						className='flex items-center justify-center px-4 h-10 ms-3 text-base font-medium text-white bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ml-20'
					>
						Next
					</button>
				) : (
					<div className='flex-1'></div>
				)}
			</div>
		</div>
	);
}
