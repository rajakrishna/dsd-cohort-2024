import { useEffect, useRef, useState } from "react";

export default function useGetDayTimeSlots(date) {
  const [data, setData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    try {
      setIsLoading(true);
      fetchTimeSlotData({ date, setData, signal: controller.signal });
      setIsLoading(false);
    } catch (error) {
      console.log("failed to fetch services");
      controller.abort();
      setIsLoading(false);
      setError({ error: "failed to fetch services" });
    }

    return () => {
      controller.abort();
    };
  }, []);

  return { data, isLoading, error };
}

async function fetchTimeSlotData({ date, setData, signal }) {
  //   const bodyData = JSON.stringify({ todaysDate: date });
  const response = await fetch(`api/timeslots/${date}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    signal,
  });

  const data = await response.json();
  setData(data);
}
