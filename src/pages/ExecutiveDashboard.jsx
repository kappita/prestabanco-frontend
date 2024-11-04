import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import DashboardNavbar from "../components/DashboardNavbar";
import DashboardOption from "../components/DashboardOption";

function ExecutiveDashboard() {
  const navigate = useNavigate()
  const {is_logged_in, jwt, name} = useAuthStore();



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

  const redirectToPeerReview = () => {
    navigate("/executives/peer_review_requests")
  }

  return (
    <div>
      <DashboardNavbar userName={name} onLogout={handleLogout} onConfig={handleConfig} />
      <main>
        <div className="grid grid-cols-2">
          <DashboardOption title="Atender solicitudes en proceso" description="Atiende solicitudes disponibles!" onClick={redirectToReview}></DashboardOption>
          <DashboardOption title="Atender solicitudes que requieren revisión" description="Revisa las solicitudes de tus pares que requieren una segunda opinión!" onClick={redirectToPeerReview}></DashboardOption>
        </div>
      </main>
    </div>
  );
}

export default ExecutiveDashboard
  