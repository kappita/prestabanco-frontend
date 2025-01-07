const numericValidation = (input) => {
    let errorMessage = "";

  if (!input) {
    errorMessage = "Este campo no puede estar vacio.";
  } else if (!/^\d+$/.test(input)) {
    if (isNaN(input)) {
      errorMessage = "Este campo debe ser un número.";
    } else if (input.includes(".")) {
      errorMessage = "Este campo debe ser un número entero.";
    } else if (Number(input) < 0) {
      errorMessage = "El número no puede ser negativo.";
    }
  }

  return {
    isValid: errorMessage === "",
    error: errorMessage,
  };
  }

  export const validateField = (input, setMessage) => {
    const validation = numericValidation(input);
    if (!validation.isValid) {
      setMessage(validation.error)
      return validation.isValid
    }
    setMessage("")
    return validation.isValid
  }