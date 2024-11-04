import React, { useState } from 'react';

const MortgageDetailsModal = ({ type, amount, paymentTerm, interestRate, status, onClose }) => {
  const handleOutsideClick = (e) => {
    if (e.target.id === 'overlay') onClose();
  };

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
          <p><strong>Tipo de préstamo:</strong> {type}</p>
          <p><strong>Monto solicitado:</strong> ${amount}</p>
          <p><strong>Plazo:</strong> {paymentTerm} años</p>
          <p><strong>Tasa de interés:</strong> {interestRate * 100}%</p>
          <p><strong>Situación:</strong> {status}</p>
        </div>
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
