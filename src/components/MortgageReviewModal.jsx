

import React, { useState } from 'react';
import DocumentsReviewSection from './DocumentsReviewSection';
import MortgageReviewSection from './MortgageReviewSection';
import SubmitButton from './SubmitButton';
import { approveMortgage } from '../service/approveMortgage';
import { outgoMortgage } from '../service/OutgoMortgage';
import useAuthStore from '../stores/authStore';
import FilesDownloader from './FilesDownloader';

const MortgageReviewModal = ({ mortgage, onClose }) => {
  const {is_logged_in, jwt, name} = useAuthStore();
  const handleOutsideClick = (e) => {
    if (e.target.id === 'overlay') onClose();
  };

  const handleApprove = () => {
    approveMortgage(mortgage.id, jwt).then(e => {
      alert("Préstamo aprobado correctamente")
      onClose()
    }).catch(e => {
      alert("Error aprobando préstamo")
    })
  }

  const handleOutgo = () => {
    outgoMortgage(mortgage.id, jwt).then(e => {
      alert("Préstamo puesto en desembolso correctamente")
      onClose()
    }).catch(e => {
      alert("Error poniendo préstamo en desembolso")
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
          <FilesDownloader files={mortgage.documents}></FilesDownloader>
          <p><strong>Tipo de préstamo:</strong> {mortgage.loan_type.name}</p>
          <p><strong>Monto solicitado:</strong> ${mortgage.financed_amount}</p>
          <p><strong>Plazo:</strong> {mortgage.payment_term} años</p>
          <p><strong>Tasa de interés:</strong> {mortgage.interest_rate * 100}%</p>
          <p><strong>Situación:</strong> {mortgage.status.name}</p>
        </div>
        {mortgage.status.id == "E1" && <DocumentsReviewSection mortgage={mortgage}/>}
        {mortgage.status.id == "E3" && <MortgageReviewSection mortgage={mortgage}/>}
        {mortgage.status.id == "E5" && <SubmitButton text="Aprobar préstamo" onClick={handleApprove}/>}
        {mortgage.status.id == "E6" && <SubmitButton text="Desembolsar préstamo" onClick={handleOutgo}/>}
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
    display: 'flex',
    width: '90%',
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

export default MortgageReviewModal;
