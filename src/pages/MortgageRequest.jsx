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
    console.log(body)
    postMortgage(body, formData, jwt).then(() => {
      alert("Solicitud subida con éxito")
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

  return (
    <div>
      <Dropdown
        label="Seleccione el tipo de prestamo"
        elements={loanTypes.map(e => e.name)}
        onSelect={handleLoanType}
      />
      {selectedLoan && <NumberInputWithSlider min={selectedLoan.min_interest_rate} max={selectedLoan.max_interest_rate} onChange={handleInterest}/>}
      {selectedLoan && <Dropdown
        label = "Plazo del préstamo (En años)"
        elements={createRangeArray(1, selectedLoan.max_term, 1)}
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
      {selectedLoan && <SubmitButton text="Solicitar préstamo" onClick={handleSubmit}/>}

    </div>
  )
}

export default MortgageRequest;