import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import DashboardOption from "../components/DashboardOption";
import useAuthStore from "../stores/authStore";

  function ClientDashboard() {

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

    const redirectToMortgages = () => {
      navigate("/client_mortgages")
    }

    const redirectToRequestMortgage = () => {
      navigate("/request_mortgage")
    }

    const redirectToSimulator = () => {
      navigate("/simulate_mortgage")
    }

    return (
      <div>
        <DashboardNavbar userName={name} onLogout={handleLogout} onConfig={handleConfig} />
        <main>
          <div className="grid grid-cols-2">
            <DashboardOption title="Ver préstamos" description="Mira el estado de las solicitudes de préstamo que has realizado!" onClick={redirectToMortgages}></DashboardOption>
            <DashboardOption title="Solicitar préstamo" description="Solicita un préstamo hipotecario!" onClick={redirectToRequestMortgage}></DashboardOption>
            <DashboardOption title="Simular préstamo" description="Simula un préstamo que se ajuste a tu bolsillo!" onClick={redirectToSimulator}></DashboardOption>
          </div>
        </main>
      </div>
    );
  }

export default ClientDashboard;