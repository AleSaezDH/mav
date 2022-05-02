import React, { useState } from "react";
import Loading from "../components/Loading";

function useLoading() {
  const [loading, setLoading] = useState(false);
  return { loading, setLoading, Loading };
}

export default useLoading;
