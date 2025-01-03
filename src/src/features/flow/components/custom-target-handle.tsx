import { Handle, Position, useHandleConnections } from "@xyflow/react";
import { CustomHandleProps } from "../types/custom-handle-props";

export const CustomTargetHandle = (props: CustomHandleProps) => {
  const {
    type,
    position,
    connectionLimit,
  } = props;

  const connections = useHandleConnections({
    type: type
  });

  return (
    <Handle
      type={type}
      position={position}
      className='!-left-4 !size-3 !border !border-gray-600 !bg-white !rounded-[2px]'
      isConnectable={connections.length < connectionLimit}
    />
  )
}