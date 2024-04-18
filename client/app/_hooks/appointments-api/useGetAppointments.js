import { useState, useEffect } from "react";

export default function useGetAppointments(date) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setError(null);
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const res = await fetchAppointmentsData({
          signal: controller.signal,
          date,
        });

        setError(null);
        setData(res.data);
      } catch (error) {
        console.log("failed to fetch appointment Data", error);
        setData([]);
        setError({ message: "failed to fetch appointment Data", error });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);
  return { data, error, isLoading };
}

async function fetchAppointmentsData({ date, signal }) {
  const params = new URLSearchParams({ date });
  const response = await fetch(`/api/appointments?${params}`, { signal });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}
