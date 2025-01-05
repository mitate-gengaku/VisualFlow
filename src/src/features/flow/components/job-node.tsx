import { Connection, Edge, Handle, Node, NodeProps, Position } from "@xyflow/react";
import { LayoutGridIcon } from "lucide-react";
import { memo } from "react";
import { CustomSourceHandle } from "./custom-source-handle";
import { CustomTargetHandle } from "./custom-target-handle";
import { useAtomValue } from "jotai";
import { nodesAtom } from "./react-flow";
import { JobData } from "../types/job-data";

export const JobNode = memo(({ data }: NodeProps<Node<JobData>>) => {
  const nodes = useAtomValue(nodesAtom);

  const isValidSourceConnection = (connection: Connection | Edge) => {
    const targetNode = nodes.find(node => node.id === connection?.target);

    if (!targetNode) return false;
    return targetNode.type === "step"
  }

  const isValidTargetConnection = (connection: Connection | Edge) => {
    const targetNode = nodes.find(node => node.id === connection?.source);

    if (!targetNode) return false;
    return targetNode.type === "workflow"
  }

  return (
    <>
      <div className='font-noto-sans-jp pb-4 text-sm border bg-white w-64 max-w-64 flex flex-col gap-2 rounded shadow'>
        <div className='flex items-center gap-2 py-2 bg-slate-50 px-3'>
          <LayoutGridIcon
            className='size-3'
          />
          <p className='text-xs'>{data.name}</p>
        </div>
        {data["runs-on"] && (
          <div className='px-3 text-[10px]'>
            <h3>runs-on: </h3>
            <p className='leading-[1] text-gray-500'>{data["runs-on"]}</p>
          </div>
        )}
      </div>
      <CustomTargetHandle
        type='target'
        position={Position.Left}
        connectionLimit={1}
        isValidConnection={isValidTargetConnection}
        />
      <CustomSourceHandle 
        type='source'
        position={Position.Right}
        connectionLimit={1}
        isValidConnection={isValidSourceConnection}
        />
    </>
  );
});