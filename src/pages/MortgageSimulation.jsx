import React, { useState} from "react"
import Dropdown from "../components/Dropdown"
import TextInput from "../components/TextInput"
import SubmitButton from "../components/SubmitButton"
import DashboardNavbar from "../components/DashboardNavbar"
import { mortgage_types } from "../utils/mortgage_types"

function MortgageSimulation() {


  const [term, setTerm] = useState('')
  const [interest, setInterest] = useState('')
  const [financedAmount, setFinancedAmount] = useState('')
  const handlePepe = () => {

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
    <div>
      <DashboardNavbar userName="John Doe" onLogout={handleLogout} onConfig={handleConfig} />
      <main>
      <Dropdown
        label="Seleccione el tipo de prestamo"
        elements={mortgage_types.map(e => e.name)}
        onSelect={handlePepe}
      />
      <TextInput
        label = "Plazo del préstamo"
        value = {term}
        onChange={(e) => setTerm(e.target.value)}
        />
      <TextInput
        label = "Interés del préstamo"
        value = {interest}
        onChange={e => setInterest(e.target.value)}
      />
      <TextInput
        label = "Monto financiado"
        value = {financedAmount}
        onChange={e => setFinancedAmount(e.target.value)}
      />
      <TextInput
        label = "Saldo en su cuenta de ahorros"
        value = {financedAmount}
        onChange={e => setFinancedAmount(e.target.value)}
      />
      <TextInput
        label = "Ingresos mensuales"
        value = {financedAmount}
        onChange={e => setFinancedAmount(e.target.value)}
      />

      <TextInput
        label = "Antigüedad laboral (En años)"
        value = {financedAmount}
        onChange={e => setFinancedAmount(e.target.value)}
      />

      <TextInput
        label = "Pago mensual de deudas"
        value = {financedAmount}
        onChange={e => setFinancedAmount(e.target.value)}
      />
      <SubmitButton text="Simular préstamo"/>
      </main>

    </div>
  )

}

export default MortgageSimulation;