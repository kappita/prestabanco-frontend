import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import DashboardNavbar from "../components/DashboardNavbar";
import DashboardOption from "../components/DashboardOption";
import SubmitButton from "../components/SubmitButton";

function ExecutiveDashboard() {
  const navigate = useNavigate()
  const {is_logged_in, jwt, name} = useAuthStore();

  
  const redirectToDashboard = () => {
    navigate("/dashboard")
  }



  const handleLogout = () => {
    console.log("Logged out");
    // Add logout logic here
  };

  const handleConfig = () => {
    console.log("Navigating to configuration");
    // Add navigation logic here
  };


  const redirectToReview = () => {
    navigate("/executives/review_requests")
  }


  return (
    <div className="h-screen w-screen">
        <DashboardNavbar userName={name} onLogout={handleLogout} onConfig={handleConfig} />
        <main className="h-full w-full flex flex-col items-center">
          <div className="w-[80%] flex justify-between">
            <h1 className="text-3xl font-bold pb-[2rem]">Herramientas</h1>
          </div>
          <div className="grid grid-cols-3 grid-rows-2 shadow-lg rounded-lg p-8 w-[80%] h-[70%] gap-4">
            <DashboardOption title="Atender solicitudes en proceso" description="Atiende solicitudes disponibles!" onClick={redirectToReview}></DashboardOption>
          </div>
        </main>
      </div>
  );
  
}

export default ExecutiveDashboard
  