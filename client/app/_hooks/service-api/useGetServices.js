import { useEffect, useRef, useState } from "react";

export default function useGetServices() {
  const [data, setData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    try {
      setIsLoading(true);
      fetchServiceData(setData, controller.signal);
      setIsLoading(false);
    } catch (error) {
      console.log("failed to fetch services");
      // controller.abort();
      setIsLoading(false);
      setError({ error: "failed to fetch services" });
    }

    return () => {
      controller.abort();
    };
  }, []);

  return { data, isLoading, error };
}

async function fetchServiceData(setData, signal) {
  const response = await fetch(`api/services`, { signal });
  const data = await response.json();
  setData(data);
}
