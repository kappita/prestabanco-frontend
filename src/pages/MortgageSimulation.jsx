import React, { useState, useEffect, useCallback } from "react"
import Dropdown from "../components/Dropdown"
import TextInput from "../components/TextInput"
import SubmitButton from "../components/SubmitButton"
import DashboardNavbar from "../components/DashboardNavbar"
import { mortgage_types } from "../utils/mortgage_types"
import useAuthStore from "../stores/authStore"
import { getLoanTypes } from "../service/getLoanTypes"
import NumberInputWithSlider from "../components/NumberInputWithSlider"
import { getSimulation } from "../service/getSimulation"
import MortgageSimulationResponse from "../components/MortgageSimulationResponse"

function MortgageSimulation() {
  const {is_logged_in, jwt, name} = useAuthStore();
  const [term, setTerm] = useState('')
  const [loanTypes, setLoanTypes] = useState([])
  const [interest, setInterest] = useState('')
  const [selectedLoan, setSelectedLoan] = useState(null)
  const [financedAmount, setFinancedAmount] = useState('')
  const [income, setIncome] = useState(null)
  const [monthlyDebt, setMonthlyDebt] = useState(null)
  const [propertyValue, setPropertyValue] = useState(null)
  const [simulationResut, setSimulationResult] = useState(null)

  const handleLoanType = (selected) => {
    const selected_loan = loanTypes.find(e => e.name === selected);
    console.log(selected_loan)
    setSelectedLoan(selected_loan)
  }

  function createRangeArray(min, max, step = 1) {
    const rangeArray = [];
    for (let i = min; i <= max; i += step) {
      rangeArray.push(i);
    }
    return rangeArray;
  }

  useEffect(() => {
    async function fetchLoanTypes() {
      console.log(jwt)
      const res = await getLoanTypes(jwt)
      setLoanTypes(res)
    }
    fetchLoanTypes()
  }, [])

  const handleInterest = (e) => {
    setInterest(e)
  }

  const handleRequest = useCallback( () => {
    const body = {
      loan_type_id: selectedLoan.id,
      payment_term: term,
      financed_amount: financedAmount,
      interest_rate: interest,
      client_income: income,
      monthly_debt: monthlyDebt,
      property_value: propertyValue
    }
    console.log(body)

    getSimulation(body, jwt).then(e => {
      console.log(e)
      setSimulationResult(e)

    }).catch(e => {
      alert("Error simulando credito. Revise los datos")
    })
  })

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
      <main>
      <Dropdown
        label="Seleccione el tipo de prestamo"
        elements={loanTypes.map(e => e.name)}
        onSelect={handleLoanType}
      />
      {selectedLoan && <div>
          <Dropdown
          label = "Plazo del préstamo (En años)"
          elements={createRangeArray(1, selectedLoan.max_term, 1)}
          onSelect={setTerm}
        />
        {selectedLoan && <NumberInputWithSlider min={selectedLoan.min_interest_rate} max={selectedLoan.max_interest_rate} onChange={handleInterest}/>}
        <TextInput
          label = "Monto financiado"
          value = {financedAmount}
          onChange={e => setFinancedAmount(e.target.value)}
        />
        <TextInput
          label = "Valor de la propiedad"
          value = {propertyValue}
          onChange={e => setPropertyValue(e.target.value)}
        />
        <TextInput
          label = "Ingresos mensuales"
          value = {income}
          onChange={e => setIncome(e.target.value)}
        />

        <TextInput
          label = "Pago mensual de deudas"
          value = {monthlyDebt}
          onChange={e => setMonthlyDebt(e.target.value)}
        />
        <SubmitButton text="Simular préstamo" onClick={handleRequest}/>
        </div>}
        {
          simulationResut && <MortgageSimulationResponse result={simulationResut}/>
        }
      
      </main>

    </div>
  )

}

export default MortgageSimulation;