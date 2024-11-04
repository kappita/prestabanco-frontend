import { useCallback, useState } from "react";
import Checkbox from "./Checkbox";
import SubmitButton from "./SubmitButton";
import { evaluateMortgage } from "../service/evaluateMortgage";
import MortgageReviewModal from "./MortgageReviewModal";
import useAuthStore from "../stores/authStore";
import TextInput from "./TextInput";



function MortgageReviewSection({mortgage, onSubmit}) {
  const {is_logged_in, jwt, name} = useAuthStore();
  const [clientIncome, setClientIncome] = useState(null);
  const [acceptableCreditStory, setAcceptableCreditStory] = useState(false)
  const [financialStability, setFinancialStability] = useState(false)
  const [monthlyDebt, setMonthlyDebt] = useState(null)
  const [propertyValue, setPropertyValue] = useState(null)
  const [clientBalance, setClientBalance] = useState(null)
  const [consistentSavings, setConsistentSavings] = useState(false)
  const [periodicSavings, setPeriodicSavings] = useState(false)
  const [savingsAccountLongevity, setSavingsAccountLongevity] = useState(null)
  const [financiallyStable, setFinanciallyStable] = useState(false)

  const handleSubmit = useCallback(() => {
    const body = {
      credit_validation: {
        client_income: clientIncome,
        has_acceptable_credit_history: acceptableCreditStory,
        has_financial_stability: financialStability,
        monthly_debt: monthlyDebt,
        property_value: propertyValue,
        validated_birthdate: null
      },
      saving_capacity: {
        client_balance: clientBalance,
        has_consistent_savings: consistentSavings,
        has_periodic_savings: periodicSavings,
        savings_account_longevity: savingsAccountLongevity,
        is_financially_stable: financiallyStable
      }
    }
    console.log(body)
    

    evaluateMortgage(mortgage.id, body, jwt).then(e => {
      alert("Solicitud evaluada")
      onSubmit(true)
    })

  })

  const handlePepe = (e) => {
    setAcceptableCreditStory(e)
    console.log(acceptableCreditStory)
  }

  return (<div>
    <h1>Evaluación de crédito</h1>
    <TextInput
      label = "Ingreso mensual del cliente"
      value = {clientIncome}
      onChange={(e) => setClientIncome(e.target.value)}
    />
    <Checkbox
      label="Tiene un historial de crédito aceptable?"
      isChecked={acceptableCreditStory}
      onChange={setAcceptableCreditStory}
    />
    <Checkbox
      label="Tiene estabilidad financiera?"
      isChecked={financialStability}
      onChange={setFinancialStability}
    />
    <TextInput
      label = "Deuda mensual del cliente"
      value = {monthlyDebt}
      onChange={e => setMonthlyDebt(e.target.value)}
    />
    <TextInput
      label = "Valor de la propiedad"
      value = {propertyValue}
      onChange={e => setPropertyValue(e.target.value)}
    />

    <h1>Capacidad de ahorro</h1>
    <TextInput
      label = "Fondos del cliente"
      value = {clientBalance}
      onChange={e => setClientBalance(e.target.value)}
    />
    <Checkbox
      label="Tiene ahorros consistentes?"
      isChecked={consistentSavings}
      onChange={setConsistentSavings}
    />
    <Checkbox
      label="Tiene ahorros periódicos?"
      isChecked={periodicSavings}
      onChange={setPeriodicSavings}
    />
    <TextInput
      label = "Cuántos años de longevidad tiene la cuenta de ahorro?"
      value = {savingsAccountLongevity}
      onChange={e => setSavingsAccountLongevity(e.target.value)}
    />
    <Checkbox
      label="Es estable financieramente?"
      isChecked={financiallyStable}
      onChange={setFinanciallyStable}
    />

    <SubmitButton onClick={handleSubmit}/>



  </div>)
}

export default MortgageReviewSection;