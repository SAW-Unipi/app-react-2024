import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { RouterProvider, createBrowserRouter, useLoaderData } from 'react-router-dom'
import { ListsPage } from './Lists'
import { TodoPage } from './Todo'

const router = createBrowserRouter([
  { path: '/', element: <ListsPage />, errorElement: <p>Route non esistente!</p> },
  { path: '/lists', element: <ListsPage /> },
  { path: '/lists/:id', element: <TodoPage />, loader: listLoader },
])

function listLoader({ params }: any) {
  return params.id;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
