import { useEffect, useState } from "react"
import useAuthStore from "../stores/authStore";
import MortgageCard from "../components/MortgageCard"
import DashboardNavbar from "../components/DashboardNavbar"
import MortgageDetailsModal from "../components/MortgageDetailsModal";
import filesDownloader from "../components/FilesDownloader";
import { getClientMortgages } from "../service/getClientMortgages";
import SubmitButton from "../components/SubmitButton";
import { useNavigate } from "react-router-dom";

const test = [
  {
    type: "Primera vivienda",
    amount: 500,
    status: "E1"
  },
  {
    type: "Segunda vivienda",
    amount: 200,
    status: "E7"
  },
  {
    type: "Primera vivienda",
    amount: 500,
    status: 'E4'
  },
  {
    type: "Remodelación",
    amount: 500000,
    status: 'E7'
  }
]
function ClientMortgages() {
  const {is_logged_in, jwt, name} = useAuthStore();
  const [selectedMortgage, setSelectedMortgage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mortgages, setMortgages] = useState([])

  const navigate = useNavigate()
  
  const redirectToDashboard = () => {
    navigate("/dashboard")
  }


  useEffect(() => {
    async function fetchData() {
      const res = await getClientMortgages(jwt)
      setMortgages(res)
      console.log(res)
    }
    fetchData()
  }, [])
  
  
  const showModal = (mortgage) => {
    setSelectedMortgage(mortgage)
    setIsModalOpen(true)
  };
  
  const closeModal = () => setIsModalOpen(false);

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
          <div className="w-[80%] h-[5%] flex justify-between">
            <h1 className="text-3xl font-bold pb-[2rem]">Solicitudes realizadas</h1>
            
          </div>
          <div className="flex flex-col items-center shadow-lg rounded-lg p-8 w-[80%] h-[70%]">
                <div className="grid grid-cols-3 grid-rows-5 gap-4">
                  {mortgages.map(e => (
                  <MortgageCard mortgage={e} onClick={() => showModal(e)}/>
                    ))}
                </div>
                {mortgages.length == 0 && <div>
                    <h3 className="w-full font-medium text-xl">No tienes solicitudes actualmente</h3>
                    </div>}
                <div className="w-[30%]">
                
                <SubmitButton text="Volver" onClick={redirectToDashboard} color="#FFB800"/>
                </div>
                
                
          </div>
        </main>
        {isModalOpen && (
          <MortgageDetailsModal
            mortgage={selectedMortgage}
            onClose={closeModal}
          />
        )}
      </div>
        )
}

export default ClientMortgages