

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
        {mortgage.status.id == "E1" && <DocumentsReviewSection mortgage={mortgage}/>}
        {mortgage.status.id == "E3" && <MortgageReviewSection mortgage={mortgage} onQuit={onClose}/>}
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
    width: '70%',
    height: '70%',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
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
