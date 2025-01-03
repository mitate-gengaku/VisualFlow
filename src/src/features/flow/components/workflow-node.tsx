import { Handle, Position } from "@xyflow/react";
import { NetworkIcon } from "lucide-react";
import { memo } from "react";
import { CustomSourceHandle } from "./custom-source-handle";

export const WorkflowNode = memo(() => {
  return (
    <>
      <div className='pb-4 text-sm border bg-white flex w-64 max-w-64 flex-col gap-1 rounded shadow'>
        <div className='flex items-center gap-2 py-2 bg-slate-50 px-3'>
          <NetworkIcon
            className='size-2.5'
          />
          <p className='text-xs'>ワークフロー名</p>
        </div>
        <div className='px-3 text-[10px]'>
          <h3>on: </h3>
          <ul className='px-4'>
            <li className='list-disc text-gray-500 leading-3'>push</li>
            <li className='list-disc text-gray-500 leading-3'>workflow_dispatch</li>
          </ul>
        </div>
      </div>
      <CustomSourceHandle
        type='source'
        position={Position.Right}
        connectionLimit={2}
        />
    </>
  );
});