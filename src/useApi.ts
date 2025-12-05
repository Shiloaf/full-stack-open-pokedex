import { useEffect, useState } from "react";
import axios from "axios";

const useApi = <T>(
  url: string,
  mapResults: ({
    results,
  }: {
    results: { url: string; name: string }[];
  }) => T = (results: any) => results
) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => setData(mapResults(response.data)))
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [url]);

  return { data, isLoading, error };
};

export { useApi };
