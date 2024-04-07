'use client'
import { mockPartsData } from "@/app/utility/mockData/mockGetPartsApi"
import { partsAttributes } from "@/constants"
import { useState } from "react";

export default function InventoryPage() {
    const [partsData, setPartsData] = useState(mockPartsData);
    /* Get request for parts
    const getPartsList = () => {
        fetch(
            '/getPartsApi', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ) 
        .then((response) => response.json())
        .then((data) => {
            if(data.status === 'success'){
                setPartsData(data.parts);
            }
        })
        .catch(error => console.log(error))
    } 
    useEffect(() => {
        getPartsList();
    }, [])
    */
    const updateParts = () => {
        /* fetch(
            '/postPartsApi', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(partsData)
            }
        ) 
        .then((response) => response.json())
        .then((data) => {
            if(data.status === 'success'){
                //send a notification or toast message that quantity has been updated successfully
            }
        })
        .catch(error => console.log(error))
        } */
    }
    const handleQuantityChange = (e, partId, delta = 0) => {
        const value = Math.max(0, parseInt(e.target.parentElement.querySelector('input[name="quantity"]').value) + delta)
        setPartsData((prevData) => prevData.map((part) => part.partId === partId ? { ...part, quantity: value } : part))
    }
    return (
        <div className="w-4/5 mx-auto">
            <h1 className="text-center">Inventory</h1>
            <table className="table text-center">
                {/* head */}
                <thead>
                    <tr className="text-black">
                        {partsAttributes.map((item, index) => <th key={index}>{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {partsData.map((part) => {
                        return (
                        <tr key={part.partId}>
                            <td>{part.name}</td>
                            <td>{part.threshold}</td>
                            <td>
                                <div className="inline-flex">
                                    <button onClick={ (e) => handleQuantityChange(e, part.partId, 1) } className="flex justify-center items-center text-2xl w-8 h-8 border-2 border-black hover:bg-gray-200">+</button>
                                    <input type="number" name="quantity" value={part.quantity} onChange={ (e) => handleQuantityChange(e, part.partId)} className="text-center w-10 h-8 bg-gray-300 border-y-2 border-black daisy-custom-input"/>
                                    <button onClick={ (e) => handleQuantityChange(e, part.partId, -1) } className="flex justify-center items-center text-2xl w-8 h-8 border-2 border-black hover:bg-gray-200">-</button>
                                    <button name="update" className="h-8 ml-4 px-2 border-2 border-black hover:bg-gray-200" onClick={updateParts}>Update</button>
                                </div>
                            </td>
                        </tr>
                    )})}
                </tbody>
            </table>
        </div>
    )
}