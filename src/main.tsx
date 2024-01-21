import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider
} from "react-router-dom"
import './global.css'
import { queryClient } from './lib/react-query.ts'
import { router } from './routes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <App /> */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
