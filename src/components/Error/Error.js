import React from "react";
import PropTypes from "prop-types";

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

Error.propTypes = {
  msge: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

Error.defaulProps = {
  msge: "",
  type: "error",
};

export default Error;
