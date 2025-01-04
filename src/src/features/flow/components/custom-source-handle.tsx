"use client"

import { Handle, Position, useHandleConnections, useReactFlow } from "@xyflow/react";
import { CustomHandleProps } from "../types/custom-handle-props";
import { useAtom, useAtomValue } from "jotai";
import { connectionAtom, nodesAtom } from "./react-flow";

export const CustomSourceHandle = (props: CustomHandleProps) => {
  const {
    type,
    position,
    connectionLimit,
    isValidConnection,
  } = props;

  const connections = useHandleConnections({
    type: type
  });

  return (
    <Handle
      type={type}
      position={position}
      className='!-right-4 !size-3 !border !border-gray-600 !bg-white !rounded-[2px]'
      isConnectable={connections.length < connectionLimit}
      isValidConnection={isValidConnection}
    />
  )
}