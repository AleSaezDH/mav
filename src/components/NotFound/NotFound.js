import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h1>Página no Encontrada</h1>
      <Link to="/">Volver a inicio</Link>
    </div>
  );
}

export default NotFound;
