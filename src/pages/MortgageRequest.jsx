import { useCallback, useEffect, useState } from "react"
import { mortgage_types } from "../utils/mortgage_types"
import Dropdown from "../components/Dropdown"
import TextInput from "../components/TextInput"
import FileSelecter from "../components/FileSelecter"
import SubmitButton from "../components/SubmitButton"
import { getLoanTypes } from "../service/getLoanTypes"
import useAuthStore from "../stores/authStore"
import NumberInputWithSlider from "../components/NumberInputWithSlider"
import { postMortgage } from "../service/postMortgage"
import DashboardNavbar from "../components/DashboardNavbar"
import { useNavigate } from "react-router-dom"

function createRangeArray(min, max, step = 1) {
  const rangeArray = [];
  for (let i = min; i <= max; i += step) {
    rangeArray.push(i);
  }
  return rangeArray;
}

function MortgageRequest() {
  const {is_logged_in, jwt, name} = useAuthStore();
  const [loanTypes, setLoanTypes] = useState([])
  const [selectedLoan, setSelectedLoan] = useState(null)
  const [term, setTerm] = useState('')
  const [interest, setInterest] = useState('')
  const [financedAmount, setFinancedAmount] = useState('')
  let formData = new FormData()

  const navigate = useNavigate()
  
    const redirectToDashboard = () => {
      navigate("/dashboard")
    }


  useEffect(() => {
    async function fetchLoanTypes() {
      console.log(jwt)
      const res = await getLoanTypes(jwt)
      setLoanTypes(res)
    }
    fetchLoanTypes()
  }, [])

  const handleLoanType = (selected) => {
    const selected_loan = loanTypes.find(e => e.name === selected);
    console.log(selected_loan)
    setSelectedLoan(selected_loan)
  }

  const handleSubmit = useCallback(() => {
    
    const body = {
      loan_type_id: selectedLoan.id,
      payment_term: term,
      financed_amount: financedAmount,
      interest_rate: interest
    }
    postMortgage(body, formData, jwt).then(() => {
      alert("Solicitud subida con éxito")
      navigate("/client_mortgages")
    })
  })

  const onFileSelect = (files) => {
    formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files`, file);
    });
  }

  const handleTerm = (e) => {
    setTerm(e)
  }

  const handleInterest = (e) => {
    setInterest(e)
  }

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
            <h1 className="text-3xl font-bold pb-[2rem]">Solicitud de crédito</h1>
          </div>
          <div className="flex flex-col items-center shadow-lg rounded-lg w-[80%] h-[70%]">
          <Dropdown
            label="Seleccione el tipo de prestamo"
            elements={loanTypes.map(e => e.name)}
            onSelect={handleLoanType}
          />
          {selectedLoan && <NumberInputWithSlider min={selectedLoan.min_interest_rate} max={selectedLoan.max_interest_rate} onChange={handleInterest}/>}
          {selectedLoan && <Dropdown
            label = "Plazo del préstamo (En años)"
            elements={createRangeArray(1, selectedLoan.max_term, 1).map(e=> e + " año(s)")}
            onSelect={handleTerm}
          />}
          {selectedLoan && <TextInput
            label = "Monto financiado"
            value = {financedAmount}
            onChange={e => setFinancedAmount(e.target.value)}
          />}
          {selectedLoan && <div> Agregue los documentos de:
            {selectedLoan.required_documents.map(e => {
            return (<ul>- {e.name}</ul>)
          })}
          </div>
            
            }
          {selectedLoan && <FileSelecter onFileSelect={onFileSelect}/>}
          {selectedLoan && <div className="w-[40%] flex">
            <SubmitButton text="Volver" onClick={redirectToDashboard} color="#FFB800"/>
            <SubmitButton text="Solicitar préstamo" onClick={handleSubmit} color="#6EEB83"/>
            </div>}
          {!selectedLoan && <div className="w-[30%]">
            <SubmitButton text="Volver" onClick={redirectToDashboard} color="#FFB800"/>
            </div>}
          </div>
        </main>
    </div>

  )
}

export default MortgageRequest;