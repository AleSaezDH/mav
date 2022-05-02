import React, { useState } from "react";
import Error from "../components/Error";

function useErrors() {
  const errorsObject = {
    inputError: { state: false, msge: "Coloca al menos 4 caracteres" },
    searchError: {
      state: false,
      msge: "No se han encontrado resultados para esa búsqueda",
    },
    reactError: { state: false, msge: "No puedes buscar la palabra react" },
  };
  const [errors, setErrors] = useState(errorsObject);

  const resetErrorsState = () => setErrors(errorsObject);

  const firstValidatorFunction = (userName) => {
    const errorsCopy = { ...errors };
    if (userName.length <= 3) {
      setErrors({ ...errors, ...(errors.inputError.state = true) });
      errorsCopy.inputError.state = true;
    } else if (userName === "react" || userName === "React") {
      setErrors({ ...errors, ...(errors.reactError.state = true) });
      errors.reactError.state = true;
    }
    return errorsCopy;
  };

  const secondValidatorFunction = (firstTenUsers) => {
    if (firstTenUsers.length === 0) {
      setErrors({ ...errors, ...(errors.searchError.state = true) });
    } else {
      setErrors(errorsObject);
    }
    return errors;
  };

  const thirdValidatorFunction = (userName) => {
    if (userName.length >= 3) {
      setErrors({
        ...errors,
        ...(errors.inputError.state = false),
        ...(errors.searchError.state = true),
      });
    } else {
      setErrors({
        ...errors,
        ...(errors.inputError.state = true),
        ...(errors.searchError.state = true),
      });
    }
    return errors;
  };

  const fourthValidatorFunction = () => {
    setErrors({ ...errors, ...(errors.searchError.state = true) });
    return errors;
  };

  return {
    errors,
    resetErrorsState,
    firstValidatorFunction,
    secondValidatorFunction,
    thirdValidatorFunction,
    fourthValidatorFunction,
    Error,
  };
}

export default useErrors;
