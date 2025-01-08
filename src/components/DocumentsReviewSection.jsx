import React, { useState, useEffect } from "react";
import SubmitButton from "./SubmitButton";
import { setInEvaluation } from "../service/setInEvaluation";
import { useNavigate } from "react-router-dom";
import { setPendingDocumentation } from "../service/setPendingDocumentation";
import FilesDownloader from "./FilesDownloader";
import useAuthStore from "../stores/authStore";
import Button from "./DisableButton";

function DocumentsReviewSection({ mortgage, onSubmit, onQuit }) {
  const navigate = useNavigate();
  const { is_logged_in, jwt, name } = useAuthStore();
  const [checkedItems, setCheckedItems] = useState(
    mortgage.loan_type.required_documents.reduce(
      (acc, item) => ({ ...acc, [item.id]: false }),
      {}
    )
  );
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    const allChecked = Object.values(checkedItems).every((value) => value);
    setIsAllChecked(allChecked);
  };
  useEffect(() => {
    const allChecked = Object.values(checkedItems).every((value) => value);
    setIsAllChecked(allChecked);
  }, [checkedItems]);

  const handleSubmit = () => {
    console.log(checkedItems);
    const missingDocs = [];
    for (const key in checkedItems) {
      if (checkedItems.hasOwnProperty(key)) {
        // Check if the key is a direct property
        if (checkedItems[key] == false) {
          missingDocs.push(parseInt(key));
        }
      }
    }
    if (missingDocs.length == 0) {
      setInEvaluation(mortgage.id, jwt).then((e) => {
        onSubmit();
      });
    } else {
      const body = {
        document_ids: missingDocs,
        details: "",
      };

      setPendingDocumentation(mortgage.id, body, jwt).then((e) => {
        setIsActive(false);
      });
    }
  };

  return (
    <div className="w-full h-full p-2">
      <div id="section-header" className="flex justify-between">
        <h1 className="font-semibold text-3xl">Revisión de documentos</h1>
        {isActive && <FilesDownloader files={mortgage.documents} />}
      </div>
      {isActive && <div className="flex flex-col justify-between h-[90%] items-center">
        <div
          id="section-body"
          className="flex flex-col items-center justify-center h-[80%]"
        >
          <h1 className="font-medium text-xl">Documentos presentes</h1>
          <p>
            Confirma que los documentos necesarios estén dentro de la solicitud
          </p>
          {mortgage.loan_type.required_documents.map((item) => (
            <label
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              {item.name}
              <input
                type="checkbox"
                checked={checkedItems[item.id]}
                onChange={() => handleCheckboxChange(item.id)}
                style={{ marginRight: "8px" }}
                className="ml-2 text-2xl"
              />
            </label>
          ))}
        </div>
        <div id="section-buttons" className="flex w-[30%]">
          <SubmitButton
            onClick={handleSubmit}
            text="Notificar falta de documentos"
            color="#FF5714"
          />
          <Button
            disabled={!isAllChecked}
            text="Validar documentación"
            onClick={handleSubmit}
          />
        </div>
      </div>}
      {!isActive && <div className="flex flex-col justify-between h-[90%]">
        <div className="h-[70%] w-full flex justify-center items-center">
          <h1>Se le notificó al cliente que faltan documentos</h1>

        </div>
        <SubmitButton text="Continuar" onClick={onQuit} color="#6EEB83"/>
        </div>}
    </div>
  );
}

export default DocumentsReviewSection;
