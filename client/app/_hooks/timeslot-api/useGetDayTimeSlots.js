import { useEffect, useRef, useState } from "react";

export default function useGetDayTimeSlots(date) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const data = await fetchTimeSlotData({
          date,
          signal: controller.signal,
        });

        setData(data);
      } catch (error) {
        console.log("failed to fetch timeslots for day", error);
        controller.abort();
        setError({ error: "failed to fetch timeslots for day" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      setIsLoading(false);
      controller.abort();
    };
  }, [date]);

  return { data, isLoading, error };
}

async function fetchTimeSlotData({ date, signal }) {
  console.log("api/timeslots/${date}", `api/timeslots/${date}`);
  const response = await fetch(`api/timeslots/${date}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    signal,
  });

  // console.log("response", await response.json());

  const data = await response.json();

  return data;
}
