import React, {useState, useEffect} from "react";
import { getReviewableMortgages } from "../service/getReviewableMortgages";
import useAuthStore from "../stores/authStore";
import DashboardNavbar from "../components/DashboardNavbar";
import MortgageCard from "../components/MortgageCard";
import MortgageReviewModal from "../components/MortgageReviewModal";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../components/SubmitButton";

function ReviewMortgages() {
  const {is_logged_in, jwt, name} = useAuthStore();
  const [selectedMortgage, setSelectedMortgage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mortgages, setMortgages] = useState([])
  const navigate = useNavigate();
  
    const redirectToDashboard = () => {
      navigate("/executives/dashboard");
    };

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


  return (
  <div className="h-screen w-screen">
  <DashboardNavbar userName={name} onLogout={handleLogout} onConfig={handleConfig} />
  <main className="h-full w-full flex flex-col items-center">
    <div className="w-[80%] flex justify-start">
      <h1 className="text-3xl font-bold pb-[2rem]">Herramientas</h1>
    </div>
    <div className="grid grid-cols-3 shadow-lg rounded-lg p-8 w-[80%] h-[70%] gap-4 overflow-scroll overflow-x-hidden">
          {mortgages.map(e => (
          <MortgageCard mortgage={e} onClick={() => showModal(e)}/>
        ))}
    </div>
    <div className="w-[20%]">
    <SubmitButton text="Volver" onClick={redirectToDashboard} color="#FFB800"/>
    </div>
  </main>
  {isModalOpen && (
        <MortgageReviewModal
          mortgage={selectedMortgage}
          onClose={closeModal}
        />
      )}
</div>
  )
}

export default ReviewMortgages;