import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import DishDetail from './pages/DishDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Oh, Seems like the page that you're looking does not exits</div>,
    children: [
      {
        index: 'true',
        element: <Navigate to="foods" />,
      },
      {
        path: '/foods',
        element: <Home />,
      },
      {
        path: '/foods/:id',
        element: <DishDetail />,
      },
      {
        path: '/about',
        element: <div>About</div>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FluentProvider theme={webLightTheme}>
      <RouterProvider router={router} />
    </FluentProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
