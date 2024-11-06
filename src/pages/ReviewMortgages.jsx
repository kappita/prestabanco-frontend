import React, {useState, useEffect} from "react";
import { getReviewableMortgages } from "../service/getReviewableMortgages";
import useAuthStore from "../stores/authStore";
import DashboardNavbar from "../components/DashboardNavbar";
import MortgageCard from "../components/MortgageCard";
import MortgageReviewModal from "../components/MortgageReviewModal";

function ReviewMortgages() {
  const {is_logged_in, jwt, name} = useAuthStore();
  const [selectedMortgage, setSelectedMortgage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mortgages, setMortgages] = useState([])

  const showModal = (mortgage) => {
    setSelectedMortgage(mortgage)
    setIsModalOpen(true)
  };
  
  const closeModal = async () => {
    setIsModalOpen(false)
    const res = await getReviewableMortgages(jwt)
    setMortgages(res)
    };

  useEffect(() => {
    async function fetchData() {
      const res = await getReviewableMortgages(jwt)
      setMortgages(res)
      console.log(res)
    }
    fetchData()
  }, [])
  


  const handleLogout = () => {
    console.log("Logged out");
    // Add logout logic here
  };

  const handleConfig = () => {
    console.log("Navigating to configuration");
    // Add navigation logic here
  };


  return (<div>
    <DashboardNavbar userName={name} onLogout={handleLogout} onConfig={handleConfig} />
    <main className="h-full">
      <h1>Solicitudes que requieren revisión</h1>
      <div className="grid w-full grid-cols-2 h-[90%]">
        {mortgages.map(e => (
          <MortgageCard mortgage={e} onClick={() => showModal(e)}/>
        ))}
      </div>
      {isModalOpen && (
        <MortgageReviewModal
          mortgage={selectedMortgage}
          onClose={closeModal}
        />
      )}
    </main>
    
  </div>)
}

export default ReviewMortgages;