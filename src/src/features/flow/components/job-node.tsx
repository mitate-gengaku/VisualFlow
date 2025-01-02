import { DashboardIcon } from "@radix-ui/react-icons";
import { Handle, Position } from "@xyflow/react";
import { memo } from "react";

export const JobNode = memo(() => {
  return (
    <>
      <div className='pb-4 text-sm border bg-white min-w-56 max-w-64 flex flex-col gap-1 rounded shadow'>
        <div className='flex items-center gap-2 py-2 bg-slate-50 px-3'>
          <DashboardIcon
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
      <Handle
        type='target'
        position={Position.Left}
        className='!-left-4 !size-3 !border !border-gray-600 !bg-white !rounded-[2px]'
      />
      <Handle
        type='source'
        position={Position.Right}
        className='!-right-4 !size-3 !border !border-gray-600 !bg-white !rounded-[2px]'
      />
    </>
  );
});