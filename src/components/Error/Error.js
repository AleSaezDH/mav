import React from "react";

// Estilos
import { Alert } from "antd";

function Error({ msge = "", type }) {
  return (
    <Alert
      message={msge}
      type={type}
      closable
      className="error-alert"
      style={{ marginTop: 20, maxWidth: 325 }}
    />
  );
}

export default Error;
