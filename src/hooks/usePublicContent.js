import { useEffect, useState } from "react";
import { fetchPublicContent } from "../services/publicApi";

export function usePublicContent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchPublicContent().then(setData);
  }, []);

  return {
    loading: !data,
    header: data?.header,
    footer: data?.footer,
    announcements: data?.announcements,
  };
}
