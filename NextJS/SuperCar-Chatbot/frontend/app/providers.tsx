"use client";
import React from "react";
import { Toaster } from "sonner";

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {

        staleTime: 60 * 1000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (isServer) {

    return makeQueryClient()
  } else {

    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}


interface Props {
  children: React.ReactNode;
}


const Providers: React.FC<Props> = ({ children }) => {
  const queryClient = getQueryClient()

  return (
    <>
      <Toaster richColors />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </>
  );
};

export default Providers;





