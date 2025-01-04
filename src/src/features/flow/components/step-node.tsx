import { Connection, Edge, Handle, Position } from "@xyflow/react";
import { BoxIcon } from "lucide-react";
import { memo } from "react";
import { CustomSourceHandle } from "./custom-source-handle";
import { CustomTargetHandle } from "./custom-target-handle";
import { useAtomValue } from "jotai";
import { connectionAtom, nodesAtom } from "./react-flow";

export const StepNode = memo(() => {
  const nodes = useAtomValue(nodesAtom);
  const connection = useAtomValue(connectionAtom);
  const sourceNode = nodes.find(node => node.id === connection?.source);
  
  const isValidSourceConnection = (connection: Connection | Edge) => {
    const targetNode = nodes.find(node => node.id === connection?.target);

    if (!targetNode) return false;
    return targetNode.type === "step"
  }

  const isValidTargetConnection = (connection: Connection | Edge) => {
    const targetNode = nodes.find(node => node.id === connection?.source);

    if (!targetNode) return false;
    return targetNode.type === "job"
  }

  return (
    <>
      <div className='pb-4 text-sm border bg-white w-64 max-w-64 flex flex-col gap-1 rounded shadow'>
        <div className='flex items-center gap-2 py-2 bg-slate-50 px-3'>
          <BoxIcon
            className='size-2.5'
          />
          <p className='text-xs'>ステップ名</p>
        </div>
        <div className='px-3 text-[10px] flex items-center gap-2'>
          <h3>uses: </h3>
          <p className='leading-[1] text-gray-500'>rtCamp/action-slack-notify@v2</p>
        </div>
        <div className='px-3 text-[10px] flex items-center gap-2'>
          <h3>run: </h3>
          <p className='text-gray-500'>
            docker compose run --rm app npm run dev
          </p>
        </div>
      </div>
      <CustomTargetHandle
        type='target'
        position={Position.Left}
        connectionLimit={sourceNode?.type === "job" ? 2 : 1}
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