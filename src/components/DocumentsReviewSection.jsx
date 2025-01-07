import React, { useState } from "react";
import SubmitButton from "./SubmitButton";
import { setInEvaluation } from "../service/setInEvaluation";
import { useNavigate } from "react-router-dom";
import { setPendingDocumentation } from "../service/setPendingDocumentation";
import FilesDownloader from "./FilesDownloader";
import useAuthStore from "../stores/authStore";

function DocumentsReviewSection({mortgage, onSubmit}) {
  console.log(mortgage.loan_type.required_documents)
  const navigate = useNavigate()
  const {is_logged_in, jwt, name} = useAuthStore();
  const [checkedItems, setCheckedItems] = useState(
    mortgage.loan_type.required_documents.reduce((acc, item) => ({ ...acc, [item.id]: false }), {})
  );
  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSubmit = () => {    
    
    console.log(checkedItems)
    const missingDocs = []
    for (const key in checkedItems) {
      if (checkedItems.hasOwnProperty(key)) { // Check if the key is a direct property
        if (checkedItems[key] == false) {
          missingDocs.push(parseInt(key))
        }
      }
    }
    console.log(missingDocs)
    if (missingDocs.length == 0) {
      setInEvaluation(mortgage.id, jwt).then(e => {
        alert("La solicitud fue puesta en evaluación")
        onSubmit(true)
      })
    } else {
      const body = {
        document_ids: missingDocs,
        details: ""
      }

      setPendingDocumentation(mortgage.id, body, jwt).then(e => {
        alert("La solicitud fue puesta en falta de documentación")
        onSubmit(true)
      })
    }
  }

  return (
    <div className="w-full h-full p-2">
      <div id="section-header" className="flex justify-between">
        <h1 className="font-semibold text-3xl">Revisión de documentos</h1>
      </div>
      <div className="flex flex-col justify-between h-[90%]">
        <div id="section-body" className="flex flex-col items-center justify-center h-[80%]">
          <h1 className="font-medium text-xl">Documentos presentes</h1>
          <p>Confirma que los documentos necesarios estén dentro de la solicitud</p>
          {mortgage.loan_type.required_documents.map((item) => (
            <label key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              {item.name}
              <input
                type="checkbox"
                checked={checkedItems[item.id]}
                onChange={() => handleCheckboxChange(item.id)}
                style={{ marginRight: '8px' }}
                className="ml-2 text-2xl"
              />
            </label>
          ))}
        </div>
        <div id="section-buttons">
        <SubmitButton onClick={handleSubmit} text="Validar documentación"/>
        </div>
        
      </div>
      
      
      
      <div>
      
      </div>
      
    </div>
  )

}

export default DocumentsReviewSection;