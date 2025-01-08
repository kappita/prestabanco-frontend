import { useCallback, useState } from "react";
import Checkbox from "./Checkbox";
import SubmitButton from "./SubmitButton";
import { evaluateMortgage } from "../service/evaluateMortgage";
import MortgageReviewModal from "./MortgageReviewModal";
import useAuthStore from "../stores/authStore";
import TextInput from "./TextInput";
import FilesDownloader from "./FilesDownloader";
import AlertModal from "./AlertModal";

function MortgageReviewSection({ mortgage, onSubmit, onQuit }) {
  const { is_logged_in, jwt, name } = useAuthStore();
  const [clientIncome, setClientIncome] = useState(null);
  const [clientIncomeErr, setClientIncomeErr] = useState("");
  const [acceptableCreditStory, setAcceptableCreditStory] = useState(false);
  const [financialStability, setFinancialStability] = useState(false);
  const [monthlyDebt, setMonthlyDebt] = useState(null);
  const [monthlyDebtErr, setMonthlyDebtErr] = useState("");
  const [propertyValue, setPropertyValue] = useState(null);
  const [propertyValueErr, setPropertyValueErr] = useState("");
  const [clientBalance, setClientBalance] = useState(null);
  const [clientBalanceErr, setClientBalanceErr] = useState("");
  const [consistentSavings, setConsistentSavings] = useState(false);
  const [periodicSavings, setPeriodicSavings] = useState(false);
  const [savingsAccountLongevity, setSavingsAccountLongevity] = useState(null);
  const [savingsAccountLongevityErr, setSavingsAccountLongevityErr] =
    useState("");
  const [financiallyStable, setFinanciallyStable] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);

  const [isDone, setIsDone] = useState(false)


  const numericValidation = (input) => {
    let errorMessage = "";

    if (!input) {
      errorMessage = "Este campo no puede estar vacio.";
    } else if (!/^\d+$/.test(input)) {
      if (isNaN(input)) {
        errorMessage = "Este campo debe ser un número.";
      } else if (input.includes(".")) {
        errorMessage = "Este campo debe ser un número entero.";
      } else if (Number(input) < 0) {
        errorMessage = "El número no puede ser negativo.";
      }
    }

    return {
      isValid: errorMessage === "",
      error: errorMessage,
    };
  };

  const validateField = (input, setMessage) => {
    const validation = numericValidation(input);
    if (!validation.isValid) {
      setMessage(validation.error);
      return validation.isValid;
    }
    setMessage("");
    return validation.isValid;
  };

  const validateAllFields = () => {
    let is_valid = true;
    is_valid = validateField(clientIncome, setClientIncomeErr) && is_valid;
    is_valid = validateField(monthlyDebt, setMonthlyDebtErr) && is_valid;
    is_valid = validateField(propertyValue, setPropertyValueErr) && is_valid;
    is_valid = validateField(clientBalance, setClientBalanceErr) && is_valid;
    is_valid =
      validateField(savingsAccountLongevity, setSavingsAccountLongevityErr) &&
      is_valid;
    if (!is_valid) {
      setIsFormValid(false);
    }

    return is_valid;
  };

  const handleSubmit = useCallback(() => {
    const validation = validateAllFields();
    if (!validation) {
      return;
    }

    const body = {
      credit_validation: {
        client_income: clientIncome,
        has_acceptable_credit_history: acceptableCreditStory,
        has_financial_stability: financialStability,
        monthly_debt: monthlyDebt,
        property_value: propertyValue,
        validated_birthdate: null,
      },
      saving_capacity: {
        client_balance: clientBalance,
        has_consistent_savings: consistentSavings,
        has_periodic_savings: periodicSavings,
        savings_account_longevity: savingsAccountLongevity,
        is_financially_stable: financiallyStable,
      },
    };

    evaluateMortgage(mortgage.id, body, jwt).then((e) => {
      setIsDone(true);
    });
  });

  return (
    <div className="h-full w-full ">
      <div
        id="section-header"
        className="flex justify-between items-center h-[10%]"
      >
        <h1 className="font-semibold text-3xl">Evaluación financiera</h1>
        {!isDone && <FilesDownloader files={mortgage.documents} />}
      </div>
      {!isDone && <div className="flex flex-col justify-between h-[90%]">
        <div id="section-content" className="grid grid-cols-2 w-full h-[80%]">
          <div
            id="credit-evaluation"
            className="flex flex-col items-center h-full justify-between"
          >
            <h2 className="text-xl font-medium relative">
              Evaluación de crédito
            </h2>

            <div className="w-full flex flex-col items-center">
              <TextInput
                label="Ingreso mensual del cliente"
                value={clientIncome}
                onChange={(e) => setClientIncome(e.target.value)}
              />
              <p className="w-[70%] h-[1rem] text-red-600">{clientIncomeErr}</p>
            </div>

            <div className="w-full flex flex-col items-center">
              <TextInput
                label="Valor de la propiedad"
                value={propertyValue}
                onChange={(e) => setPropertyValue(e.target.value)}
              />
              <p className="w-[70%] h-[1rem] text-red-600">
                {propertyValueErr}
              </p>
            </div>
            <div className="w-full flex flex-col items-center">
              <TextInput
                label="Deuda mensual del cliente"
                value={monthlyDebt}
                onChange={(e) => setMonthlyDebt(e.target.value)}
              />
              <p className="w-[70%] h-[1rem] text-red-600">{monthlyDebtErr}</p>
            </div>

            <Checkbox
              label="Tiene un historial de crédito aceptable?"
              isChecked={acceptableCreditStory}
              onChange={setAcceptableCreditStory}
            />
            <Checkbox
              label="Tiene estabilidad laboral?"
              isChecked={financialStability}
              onChange={setFinancialStability}
            />
          </div>
          <div
            id="saving-capacity"
            className="flex flex-col items-center h-full justify-between"
          >
            <h2 className="text-xl font-medium">Capacidad de ahorro</h2>
            <div className="w-full flex flex-col items-center">
              <TextInput
                label="Fondos del cliente"
                value={clientBalance}
                onChange={(e) => setClientBalance(e.target.value)}
              />
              <p className="w-[70%] h-[1rem] text-red-600">
                {clientBalanceErr}
              </p>
            </div>
            <div className="w-full flex flex-col items-center">
              <TextInput
                label="Cuántos años de longevidad tiene la cuenta de ahorro?"
                value={savingsAccountLongevity}
                onChange={(e) => setSavingsAccountLongevity(e.target.value)}
              />
              <p className="w-[70%] h-[1rem] text-red-600">
                {savingsAccountLongevityErr}
              </p>
            </div>

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
            <Checkbox
              label="Es estable financieramente?"
              isChecked={financiallyStable}
              onChange={setFinanciallyStable}
            />
          </div>
        </div>
        <div className="flex justify-center w-full">
          <div className="w-[30%]">
            <SubmitButton onClick={onQuit} color="#FFB800" text="Volver" />
          </div>
          <div className="w-[30%]">
            <SubmitButton
              onClick={handleSubmit}
              color="#6EEB83"
              text="Evaluar crédito"
            />
          </div>
        </div>
      </div>}
      {isDone && <div className="flex flex-col justify-between h-[90%]">
        <div className="h-[70%] w-full flex justify-center items-center">
          <h1>La solicitud fue evaluada con éxito</h1>

        </div>
        <SubmitButton text="Continuar" onClick={onQuit} color="#6EEB83"/>
        </div>}
    </div>
  );
}

export default MortgageReviewSection;
