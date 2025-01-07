"use client";

import { Handle, useHandleConnections } from "@xyflow/react";

import { CustomHandleProps } from "@/features/flow/types/custom-handle-props";

export const CustomSourceHandle = (props: CustomHandleProps) => {
  const { type, position, connectionLimit } = props;

  const connections = useHandleConnections({
    type: type,
  });

  return (
    <Handle
      type={type}
      position={position}
      className="!-right-4 !size-3 !border !border-gray-600 !bg-white !rounded-[2px]"
      isConnectable={connections.length < connectionLimit}
    />
  );
};
