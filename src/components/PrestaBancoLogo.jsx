import React from 'react';

function PrestaBanco({ fontSize = "1rem" }) {
  const styles = {
    presta: {
      fontWeight: "bold",
      color: "black",
      fontSize,
    },
    banco: {
      fontWeight: "bold",
      color: "#FFB800",
      fontSize,
    },
  };

  return (
    <div>
      <span style={styles.presta}>Presta</span>
      <span style={styles.banco}>Banco</span>
    </div>
  );
}

export default PrestaBanco;
