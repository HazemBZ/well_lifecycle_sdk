import React from "react";
import Routes from "./Routes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { reactQueryClient } from "react-query-config";

function App() {

  return (
    <>
      <QueryClientProvider client={reactQueryClient}>
        <Routes />
      </QueryClientProvider>
    </>
  );
}

export default App;
