import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.tsx";

// We can customize the QueryClient here if needed globally in here inside QueryClient below
// new QueryClient({retry: 3, cacheTime: 300_000, staleTime: 10 * 1000, refetchOnWindowFocus: false, refetchOnReconnect: false}) for example
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
