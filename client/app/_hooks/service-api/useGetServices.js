import { useEffect, useState } from "react";

export default function useGetServices() {
  const [data, setData] = useState([{}]);
  const [loading, setLoading] = useState([{}]);

  useEffect(() => {
    fetchServiceData(setData);
    return () => {
      second;
    };
  }, []);

  return { data, isLoading, error };
}

//
async function fetchServiceData(setData) {
  await fetch;
}
