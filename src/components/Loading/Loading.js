import React from "react";

// Estilos
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

function Loading() {
  return <Spin indicator={antIcon} />;
}

export default Loading;
