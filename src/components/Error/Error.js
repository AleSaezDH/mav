import React from "react";

function Error({ msge = "" }) {
  return (
    <div>
      <p style={{ color: "red" }}>{msge}</p>
    </div>
  );
}

export default Error;
