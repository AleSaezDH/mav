import React, { useState } from "react";
import Error from "../components/Error";

function useError() {
  const [searchErrors, setSearchErrors] = useState("");
  const [inputErrors, setInputErrors] = useState("");

  const searchValidator = (apiError) => {
    if (apiError) {
      setSearchErrors("No se han encontrado resultados para esa búsqueda");
      <Error msge="No se han encontrado resultados para esa búsqueda" />;
    } else {
      setSearchErrors("");
    }
  };

  const inputValidator = (inputText) => {
    if (inputText.length <= 3) {
      setInputErrors("Por favor coloca más de tres caracteres");
      <Error msge="Por favor coloca más de tres caracteres" />;
    } else {
      setInputErrors("");
    }
  };

  return {
    searchErrors,
    inputErrors,
    searchValidator,
    inputValidator,
  };
}

export default useError;
