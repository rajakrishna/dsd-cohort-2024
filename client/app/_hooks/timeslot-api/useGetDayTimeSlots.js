import { useEffect, useRef, useState } from "react";

export default function useGetDayTimeSlots(date) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const controllerRef = useRef(new AbortController());

  useEffect(() => {
    const controller = controllerRef.current;

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

    if ((!isLoading, date)) {
      fetchData();
    }

    return () => {
      controller.abort();
    };
  }, []);

  return { data, isLoading, error };
}

async function fetchTimeSlotData({ date, signal }) {
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
