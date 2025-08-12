import { QueryClient } from "@tanstack/react-query";

export const reactQueryconfig = {
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
};

export const reactQueryClient = new QueryClient(reactQueryconfig);
