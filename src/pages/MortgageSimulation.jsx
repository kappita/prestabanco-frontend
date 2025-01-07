import React, { useState, useEffect, useCallback } from "react";
import Dropdown from "../components/Dropdown";
import TextInput from "../components/TextInput";
import SubmitButton from "../components/SubmitButton";
import DashboardNavbar from "../components/DashboardNavbar";
import { mortgage_types } from "../utils/mortgage_types";
import useAuthStore from "../stores/authStore";
import { getLoanTypes } from "../service/getLoanTypes";
import NumberInputWithSlider from "../components/NumberInputWithSlider";
import { getSimulation } from "../service/getSimulation";
import MortgageSimulationResponse from "../components/MortgageSimulationResponse";
import { validateField } from "../utils/validateNumericField";
import { useNavigate } from "react-router-dom";

function MortgageSimulation() {
  const { is_logged_in, jwt, name } = useAuthStore();
  const [term, setTerm] = useState("");
  const [loanTypes, setLoanTypes] = useState([]);
  const [interest, setInterest] = useState("");
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [financedAmount, setFinancedAmount] = useState("");
  const [financedAmountErr, setFinancedAmountErr] = useState("")
  const [income, setIncome] = useState(null);
  const [incomeErr, setIncomeErr] = useState("");
  const [monthlyDebt, setMonthlyDebt] = useState(null);
  const [monthlyDebtErr, setMonthlyDebtErr] = useState("")
  const [propertyValue, setPropertyValue] = useState(null);
  const [propertyValueErr, setPropertyValueErr] =  useState("")
  const [simulationResut, setSimulationResult] = useState(null);

  const navigate = useNavigate()

  const redirectToDashboard = () => {
    navigate("/dashboard")
  }

  const validateAllFields = () => {
    let is_valid = true;
    is_valid = validateField(financedAmount, setFinancedAmountErr) && is_valid;
    is_valid = validateField(income, setIncomeErr) && is_valid;
    is_valid = validateField(monthlyDebt, setMonthlyDebtErr) && is_valid;
    is_valid = validateField(propertyValue, setPropertyValueErr) && is_valid;
    return is_valid;
  }
  
  const handleLoanType = (selected) => {
    const selected_loan = loanTypes.find((e) => e.name === selected);
    console.log(selected_loan);
    setSelectedLoan(selected_loan);
  };

  function createRangeArray(min, max, step = 1) {
    const rangeArray = [];
    for (let i = min; i <= max; i += step) {
      rangeArray.push(i);
    }
    return rangeArray;
  }

  useEffect(() => {
    async function fetchLoanTypes() {
      console.log(jwt);
      const res = await getLoanTypes(jwt);
      setLoanTypes(res);
    }
    fetchLoanTypes();
  }, []);

  const handleInterest = (e) => {
    setInterest(e);
  };

  const handleRequest = useCallback(() => {
    const validation = validateAllFields();
    if (!validation) {
      return
    }

    const body = {
      loan_type_id: selectedLoan.id,
      payment_term: term,
      financed_amount: financedAmount,
      interest_rate: interest,
      client_income: income,
      monthly_debt: monthlyDebt,
      property_value: propertyValue,
    };
    console.log(body);

    getSimulation(body, jwt)
      .then((e) => {
        console.log(e);
        setSimulationResult(e);
      })
      .catch((e) => {
        alert("Error simulando credito. Revise los datos");
      });
  });

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
      <DashboardNavbar
        userName={name}
        onLogout={handleLogout}
        onConfig={handleConfig}
      />
      <main className="h-full w-full flex flex-col items-center">
        <div className="w-[80%] flex justify-start">
          <h1 className="text-3xl font-bold pb-[2rem]">Simulación de crédito</h1>
        </div>
        <div className="flex flex-col items-center shadow-lg rounded-lg p-8 w-[80%] h-[70%] gap-4">
          <Dropdown
            label="Seleccione el tipo de prestamo"
            elements={loanTypes.map((e) => e.name)}
            onSelect={handleLoanType}
          />
          {selectedLoan && (
            <div className="flex flex-col items-center h-full w-[40%] justify-between">
              <Dropdown
                label="Plazo del préstamo (En años)"
                elements={createRangeArray(1, selectedLoan.max_term, 1).map(e=> e + " año(s)")}
                onSelect={setTerm}
              />
              {selectedLoan && (
                <NumberInputWithSlider
                  min={selectedLoan.min_interest_rate}
                  max={selectedLoan.max_interest_rate}
                  onChange={handleInterest}
                />
              )}

              <div className="w-full flex flex-col items-center">
                <TextInput
                  label="Monto financiado"
                  value={financedAmount}
                  onChange={(e) => setFinancedAmount(e.target.value)}
                />
                <p className="w-[70%] h-[1rem] text-red-600">{financedAmountErr}</p>
              </div>
              <div className="w-full flex flex-col items-center">
                <TextInput
                  label="Valor de la propiedad"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(e.target.value)}
                />
                <p className="w-[70%] h-[1rem] text-red-600">{propertyValueErr}</p>
              </div>
              <div className="w-full flex flex-col items-center">
                <TextInput
                  label="Ingresos mensuales"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                />
                <p className="w-[70%] h-[1rem] text-red-600">{incomeErr}</p>
              </div>
              <div className="w-full flex flex-col items-center">
                <TextInput
                  label="Pago mensual de deudas"
                  value={monthlyDebt}
                  onChange={(e) => setMonthlyDebt(e.target.value)}
                />
                <p className="w-[70%] h-[1rem] text-red-600">{monthlyDebtErr}</p>
              </div>
              <div id="buttons" className="w-[70%] flex justify-between">
              <SubmitButton text="Volver" onClick={redirectToDashboard} color="#FFB800"/>
              <SubmitButton text="Simular préstamo" onClick={handleRequest} color="#6EEB83"/>
              </div>
            </div>
          )}
        <div className="w-[30%]">
        {!selectedLoan && <SubmitButton text="Volver" onClick={redirectToDashboard} color="#FFB800"/>}
        </div>
        </div>
      </main>
      {simulationResut && (
        <MortgageSimulationResponse result={simulationResut} />
      )}
    </div>
  );
}

export default MortgageSimulation;
