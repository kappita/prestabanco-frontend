import React from 'react';

const MortgageCard = ({ mortgage, onClick }) => {
  // Determine the color of the status dot based on the status
  const getStatusColor = () => {
    switch (mortgage.status.id) {
      case 'E1':
        return 'gray';
      case 'E2':
        return '#FFB800';
      case 'E3':
        return 'gray';
      case 'E4':
        return '#FFB800'
      case 'E5':
        return '#FFB800'
      case 'E6':
        return 'green'
      case 'E7':
        return 'red'
      case 'E8':
        return 'red'
      case 'E9':
        return 'green'
      default:
        return 'gray';
    }
  };

  return (
    <div style={styles.card} onClick={onClick}>
      <div style={styles.header}>
        <span style={styles.statusDot(getStatusColor())}></span>
        <h2 style={styles.title}>{mortgage.loan_type.name}</h2>
      </div>
      <div style={styles.content}>
        <p><strong>Monto solicitado:</strong> ${mortgage.financed_amount}</p>
        <p><strong>Situación:</strong> {mortgage.status.name}</p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    width: '100%',
    height: '100%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  statusDot: (color) => ({
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: color,
    marginRight: '8px',
  }),
  title: {
    fontSize: '18px',
    margin: 0,
  },
  content: {
    fontSize: '16px',
    color: '#555',
  },
};

export default MortgageCard;
