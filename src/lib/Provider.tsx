'use client'

import React from 'react';
import {QueryClientProvider} from '@tanstack/react-query';
import {QueryClient} from '@tanstack/query-core';

export const Provider = ({ children }: {children: React.ReactNode}) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
};
