import React from "react";
import { Link } from "react-router-dom";

// Estilos
import { Result } from "antd";

function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Página no Encontrada"
      extra={<Link to="/">Volver a inicio</Link>}
    />
  );
}

export default NotFound;
