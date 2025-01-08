import { useCallback, useEffect, useState } from "react";
import { mortgage_types } from "../utils/mortgage_types";
import Dropdown from "../components/Dropdown";
import TextInput from "../components/TextInput";
import FileSelecter from "../components/FileSelecter";
import SubmitButton from "../components/SubmitButton";
import { getLoanTypes } from "../service/getLoanTypes";
import useAuthStore from "../stores/authStore";
import NumberInputWithSlider from "../components/NumberInputWithSlider";
import { postMortgage } from "../service/postMortgage";
import DashboardNavbar from "../components/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import { validateField } from "../utils/validateNumericField";
import AlertModal from "../components/AlertModal";
function createRangeArray(min, max, step = 1) {
  const rangeArray = [];
  for (let i = min; i <= max; i += step) {
    rangeArray.push(i);
  }
  return rangeArray;
}

function MortgageRequest() {
  const { is_logged_in, jwt, name } = useAuthStore();
  const [loanTypes, setLoanTypes] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [term, setTerm] = useState("");
  const [termErr, setTermErr] = useState("");
  const [interest, setInterest] = useState("");
  const [interestErr, setInterestErr] = useState("");
  const [financedAmount, setFinancedAmount] = useState("");
  const [financedAmountErr, setFinancedAmountErr] = useState("");
  const [filesErr, setFilesErr] = useState("");
  const [showModal, setShowModal] = useState(false);
  let formData = new FormData();

  const validateAllFields = () => {
    let is_valid = true;
    is_valid = validateField(financedAmount, setFinancedAmountErr) && is_valid;
    if (!term) {
      is_valid = false;
      setTermErr("Debes seleccionar una opción");
    } else {
      setTermErr("");
    }
    if (formData.getAll("files").length == 0) {
      is_valid = false;
      setFilesErr(
        "Es necesario adjuntar los archivos para realizar la solicitud"
      );
    } else {
      setFilesErr("");
    }

    return is_valid;
  };

  const navigate = useNavigate();

  const redirectToDashboard = () => {
    navigate("/dashboard");
  };

  const redirectToMortgages = () => {
    navigate("/client_mortgages")
  }

  useEffect(() => {
    async function fetchLoanTypes() {
      console.log(jwt);
      const res = await getLoanTypes(jwt);
      setLoanTypes(res);
    }
    fetchLoanTypes();
  }, []);

  const handleLoanType = (selected) => {
    const selected_loan = loanTypes.find((e) => e.name === selected);
    console.log(selected_loan);
    setSelectedLoan(selected_loan);
  };

  const handleSubmit = useCallback(() => {
    const validation = validateAllFields();
    if (!validation) {
      return;
    }

    const body = {
      loan_type_id: selectedLoan.id,
      payment_term: term,
      financed_amount: financedAmount,
      interest_rate: interest,
    };
    postMortgage(body, formData, jwt).then(() => {
      setShowModal(true)
    });
  });

  const onFileSelect = (files) => {
    formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files`, file);
    });
  };

  const handleTerm = (e) => {
    setTerm(e);
  };

  const handleInterest = (e) => {
    setInterest(e);
  };

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
      {showModal && <AlertModal title="Solicitud de crédito" message="La solicitud de crédito fue creada correctamente" onNext={redirectToMortgages}/>}
      <DashboardNavbar
        userName={name}
        onLogout={handleLogout}
        onConfig={handleConfig}
      />
      <main className="h-full w-full flex flex-col items-center">
        <div className="w-[80%] flex justify-start">
          <h1 className="text-3xl font-bold pb-[2rem]">Solicitud de crédito</h1>
        </div>
        <div className="flex flex-col items-center shadow-lg rounded-lg w-[80%] min-h-[80%] py-[1rem]">
          <Dropdown
            label="Seleccione el tipo de prestamo"
            elements={loanTypes.map((e) => e.name)}
            onSelect={handleLoanType}
          />
          {selectedLoan && (
            <div className="flex flex-col items-center h-full w-[40%] justify-between">
              <div className="w-full flex flex-col items-center">
                <Dropdown
                  label="Plazo del préstamo (En años)"
                  elements={createRangeArray(1, selectedLoan.max_term, 1)}
                  onSelect={setTerm}
                />
                <p className="w-full text-center h-[1rem] text-red-600">
                  {termErr}
                </p>
              </div>

              <NumberInputWithSlider
                min={selectedLoan.min_interest_rate}
                max={selectedLoan.max_interest_rate}
                onChange={handleInterest}
              />

              <div className="w-full flex flex-col items-center">
                <TextInput
                  label="Monto financiado"
                  value={financedAmount}
                  onChange={(e) => setFinancedAmount(e.target.value)}
                />
                <p className="w-[70%] h-[1rem] text-red-600">
                  {financedAmountErr}
                </p>
              </div>

              <div className="flex flex-col justify-between items-center">
                <h3 className="font-semibold">
                  Documentos necesarios para solicitar el préstamo
                </h3>
                <p>
                  Necesitamos estos documentos para verificar tus datos
                  financieros
                </p>
                <ul className="w-full mt-[15px] flex flex-col items-center">
                  {selectedLoan.required_documents.map((document, index) => (
                    <li key={index} className="px-[5px] py-0 text-[15px]">
                      - {document.name}
                    </li>
                  ))}
                </ul>
                <FileSelecter onFileSelect={onFileSelect} />
                <p className="w-full text-center h-[1rem] text-red-600">
                  {filesErr}
                </p>
              </div>

              <div id="buttons" className="w-[70%] flex justify-between">
                <SubmitButton
                  text="Volver"
                  onClick={redirectToDashboard}
                  color="#FFB800"
                />
                <SubmitButton
                  text="Solicitar préstamo"
                  onClick={handleSubmit}
                  color="#6EEB83"
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default MortgageRequest;
