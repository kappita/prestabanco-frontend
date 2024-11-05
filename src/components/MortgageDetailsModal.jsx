import React, { useState } from 'react';
import FileSelecter from './FileSelecter';
import SubmitButton from './SubmitButton';
import { addDocuments } from '../service/addDocuments';
import useAuthStore from '../stores/authStore';

const MortgageDetailsModal = ({ mortgage, onClose }) => {
  const {is_logged_in, jwt, name} = useAuthStore();
  let formData = new FormData()
  const handleOutsideClick = (e) => {
    if (e.target.id === 'overlay') onClose();
  };
  console.log(mortgage)

  const onFileSelect = (files) => {
    formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files`, file);
    });
  }
  
  const handleAddDocuments = () => {
    addDocuments(mortgage.id, formData, jwt).then(e => {
      alert("Documentos añadidos correctamente")
    }).catch(e => {
      alert("error subiendo docs")
    })
  }
  

  return (
    <div
      id="overlay"
      onClick={handleOutsideClick}
      style={styles.overlay}
    >
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeButton}>✕</button>
        <h2 style={styles.header}>Estado del préstamo</h2>
        <div style={styles.content}>
          <p><strong>Tipo de préstamo:</strong> {mortgage.loan_type.name}</p>
          <p><strong>Monto solicitado:</strong> ${mortgage.financed_amount}</p>
          <p><strong>Plazo:</strong> {mortgage.payment_term} años</p>
          <p><strong>Tasa de interés:</strong> {mortgage.interest_rate * 100}%</p>
          <p><strong>Situación:</strong> {mortgage.status.name}</p>
        </div>
        {mortgage.status.id == "E2" && <FileSelecter onFileSelect={onFileSelect}/>}
        {mortgage.status.id == "E2" && <SubmitButton onClick={handleAddDocuments} text="Añadir documentos"/>}
      </div>
      
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    position: 'relative',
    width: '300px',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
  },
  header: {
    margin: '0 0 15px',
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    fontSize: '16px',
    color: '#555',
  },
};

export default MortgageDetailsModal;
