import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider,createBrowserRouter, createHashRouter Link } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ClientDashboard from './pages/ClientDashboard.jsx';
import MortgageRequest from './pages/MortgageRequest.jsx';
import ClientMortgages from './pages/ClientMortgages.jsx';
import MortgageSimulation from './pages/MortgageSimulation.jsx';
import { pdfjs } from 'react-pdf';
import ExecutiveLogin from './pages/ExecutiveLogin.jsx';
import ExecutiveRegister from './pages/ExecutiveRegister.jsx';
import ExecutiveDashboard from './pages/ExecutiveDashboard.jsx';
import ReviewMortgages from './pages/ReviewMortgages.jsx';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const router = createHashRouter([
  {
    path: "/",
    element: (
      <div className='grid grid-cols-1'>
        <h1 className='bg-red-500'>Hello World</h1>
        <Link to="about">About Us</Link>
        <Link to="login">Login</Link>
        <Link to="register">Register</Link>
        <Link to="dashboard">Dashboard</Link>
        <Link to="request_mortgage">Mortgage request</Link>
        <Link to="simulate_mortgage">Mortgage simulation</Link>
        <Link to="executives/login">Executive login</Link>
        <Link to="executives/register">Executive register</Link>
        <Link to="executives/dashboard">Executive dashboard</Link>
      </div>
    ),
  },
  {
    path: "about",
    element: <App/>
  },
  {
    path: "login",
    element: <Login/>
  },
  {
    path: "register",
    element: <Register/>
  },
  {
    path: "dashboard",
    element: <ClientDashboard/>
  },
  {
    path: "request_mortgage",
    element: <MortgageRequest/>
  },
  {
    path: "client_mortgages",
    element: <ClientMortgages/>
  },
  {
    path: "simulate_mortgage",
    element: <MortgageSimulation/>
  },
  {
    path: "executives/register",
    element: <ExecutiveRegister/>
  },
  {
    path: "executives/login",
    element: <ExecutiveLogin/>
  },
  {
    path: "executives/review_requests",
    element: <ReviewMortgages/>
  },
  {
    path: "executives/dashboard",
    element: <ExecutiveDashboard/>
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
