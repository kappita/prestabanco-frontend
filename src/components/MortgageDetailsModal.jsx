import React, { useState } from "react";
import FileSelecter from "./FileSelecter";
import SubmitButton from "./SubmitButton";
import { addDocuments } from "../service/addDocuments";
import useAuthStore from "../stores/authStore";
import { cancelMortgage } from "../service/cancelMortage";
import MortgageConditions from "./MortgageConditions";

const MortgageDetailsModal = ({ mortgage, onClose }) => {
  const { is_logged_in, jwt, name } = useAuthStore();
  let formData = new FormData();
  const handleOutsideClick = (e) => {
    if (e.target.id === "overlay") onClose();
  };
  console.log(mortgage);

  const onFileSelect = (files) => {
    formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files`, file);
    });
  };

  const handleAddDocuments = () => {
    addDocuments(mortgage.id, formData, jwt)
      .then((e) => {
        alert("Documentos añadidos correctamente");
      })
      .catch((e) => {
        alert("error subiendo docs");
      });
  };

  const handleCancelMortgage = () => {
    cancelMortgage(mortgage.id, jwt)
      .then((e) => {
        alert("Solicitud cancelada con éxito");
      })
      .catch((e) => {
        alert("Error cancelando la solicitud");
      });
  };

  return (
    <div
      id="overlay"
      onClick={handleOutsideClick}
      style={styles.overlay}
      className="h-screen w-screen"
    >
      <div style={styles.modal} className="w-[40%] flex flex-col items-center justify-center">
        <div className="flex justify-around">
          <h2 style={styles.header}>Estado del préstamo</h2>
          <div className="flex">
          </div>
        </div>

        <div style={styles.content} className="flex flex-col items-center justify-center">
          <p>
            <strong>Tipo de préstamo:</strong> {mortgage.loan_type.name}
          </p>
          <p>
            <strong>Monto solicitado:</strong> ${mortgage.financed_amount}
          </p>
          <p>
            <strong>Plazo:</strong> {mortgage.payment_term} años
          </p>
          <p>
            <strong>Tasa de interés:</strong> {mortgage.interest_rate * 100}%
          </p>
          <p>
            <strong>Situación:</strong> {mortgage.status.name}
          </p>
        </div>
        {mortgage.status.id == "E2" && (
          <FileSelecter onFileSelect={onFileSelect} />
        )}
        {mortgage.status.id == "E4" && (
          <MortgageConditions mortgage={mortgage} />
        )}
        <div id="buttons" className="w-full h-[10%] flex justify-around mt-[1rem]">
          <div className="w-[25%] h-full">
            <SubmitButton text="Volver" onClick={onClose} color="#FFB800" />
          </div>
          <div className="flex w-[50%] justify-between">
            <div className="w-[45%]">
              {mortgage.status.id != "E7" && mortgage.status.id != "E8" && <SubmitButton
                text="Cancelar solicitud"
                onClick={handleCancelMortgage}
                color="#FF5714"
              />}
            </div>
            <div className="w-[45%]">
              {mortgage.status.id == "E4" && <SubmitButton
                text="Aceptar préstamo"
                onClick={onClose}
                color="#6EEB83"
              />}
              {mortgage.status.id == "E2" && <SubmitButton
                text="Actualizar documentos"
                onClick={handleAddDocuments}
                color="#6EEB83"
              />}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    position: "relative",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
  },
  header: {
    margin: "0 0 15px",
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    fontSize: "16px",
    color: "#555",
  },
};

export default MortgageDetailsModal;
