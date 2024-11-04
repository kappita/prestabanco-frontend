import { useEffect, useState } from "react"
import useAuthStore from "../stores/authStore";
import MortgageCard from "../components/MortgageCard"
import DashboardNavbar from "../components/DashboardNavbar"
import MortgageDetailsModal from "../components/MortgageDetailsModal";
import filesDownloader from "../components/FilesDownloader";
import { getClientMortgages } from "../service/getClientMortgages";

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
    <div>
      <DashboardNavbar userName={name} onLogout={handleLogout} onConfig={handleConfig} />
      <main className="h-full">
          <h1>Solicitudes realizadas</h1>
          <div className="grid w-full grid-cols-2 h-[90%]">
            {mortgages.map(e => (
              <MortgageCard type={e.loan_type.id} status={e.status.name} amount={e.financed_amount} onClick={() => showModal(e)}/>
            ))}
          </div>
        </main>
        {isModalOpen && (
        <MortgageDetailsModal
          type={selectedMortgage.loan_type.id}
          amount={selectedMortgage.financed_amount}
          paymentTerm={selectedMortgage.payment_term}
          interestRate={selectedMortgage.interest_rate * 100}
          status={selectedMortgage.status.name}
          onClose={closeModal}
        />
      )}
    </div>
  )
}

export default ClientMortgages