import useSWR from "swr";
import fetcher from "@/lib/fetcher";

// SWR Mise en cache des données...

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
