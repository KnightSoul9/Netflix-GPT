import React from 'react';
import Login from './Login';
import Browse from './Browse';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/browse',
      element: <Browse />,
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <div className="w-full max-w-screen-2xl mx-auto transition-all duration-300">
        <RouterProvider router={appRouter} />
      </div>
    </div>
  );
};

export default Body;