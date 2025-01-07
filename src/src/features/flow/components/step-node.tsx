import { Connection, Edge, Handle, Node, NodeProps, Position } from "@xyflow/react";
import { BoxIcon } from "lucide-react";
import { memo } from "react";
import { CustomSourceHandle } from "./custom-source-handle";
import { CustomTargetHandle } from "./custom-target-handle";
import { useAtomValue } from "jotai";
import { connectionAtom, nodesAtom } from "./react-flow";
import { StepData } from "../types/step-data";
import Markdown from "react-markdown"
import remarkBreaks from "remark-breaks";

export const StepNode = memo(({ id, data }: NodeProps<Node<StepData>>) => {
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
      <div className='font-noto-sans-jp pb-4 text-sm border bg-white w-64 max-w-64 flex flex-col gap-2 rounded shadow'>
        <div className='flex items-center gap-2 py-2 bg-slate-50 px-3'>
          <BoxIcon
            className='size-3'
          />
          <p className='text-xs'>{data.name ? data.name : id}</p>
        </div>
        {data.run && (
          <div className='px-3 text-[10px]'>
            <h3>run: </h3>
            <Markdown
              remarkPlugins={[
                remarkBreaks
              ]}
              className='leading-[1] text-gray-500'
              >
              {data.run}
            </Markdown>
          </div>
        )}
      </div>
      <CustomTargetHandle
        type='target'
        position={Position.Left}
        connectionLimit={sourceNode?.type === "step" ? 1 : 20}
        />
      <CustomSourceHandle
        type='source'
        position={Position.Right}
        connectionLimit={1}
        />
    </>
  );
});