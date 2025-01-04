import { Connection, Edge, Handle, Position } from "@xyflow/react";
import { LayoutGridIcon } from "lucide-react";
import { memo } from "react";
import { CustomSourceHandle } from "./custom-source-handle";
import { CustomTargetHandle } from "./custom-target-handle";
import { useAtomValue } from "jotai";
import { nodesAtom } from "./react-flow";

export const JobNode = memo(() => {
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
      <div className='pb-4 text-sm border bg-white w-64 max-w-64 flex flex-col gap-1 rounded shadow'>
        <div className='flex items-center gap-2 py-2 bg-slate-50 px-3'>
          <LayoutGridIcon
            className='size-2.5'
          />
          <p className='text-xs'>ジョブ名</p>
        </div>
        <div className='px-3 text-[10px]'>
          <h3>runs-on: </h3>
          <p className='leading-[1] text-gray-500'>ubuntu-latest</p>
        </div>
        <div className='px-3 text-[10px]'>
          <h3>timeout-minutes: </h3>
          <p className='leading-[1] text-gray-500'>30</p>
        </div>
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