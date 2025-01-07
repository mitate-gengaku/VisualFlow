import { Node, NodeProps, Position } from "@xyflow/react";
import { NetworkIcon } from "lucide-react";
import { memo } from "react";

import { CustomSourceHandle } from "@/features/flow/components/custom-source-handle";

import { WorkflowData } from "@/features/flow/types/workflow-data";

export const WorkflowNode = memo(({ data }: NodeProps<Node<WorkflowData>>) => {
  return (
    <>
      <div className="font-noto-sans-jp pb-4 text-sm border bg-white flex w-64 max-w-64 flex-col gap-2 rounded shadow">
        <div className="flex items-center gap-2 py-2 bg-slate-50 px-3">
          <NetworkIcon className="size-3" />
          <p className="text-xs">{data.name}</p>
        </div>
        {data.on && (
          <div className="px-3 text-[10px]">
            <h3>on: </h3>
            <ul className="px-4">
              {Object.keys(data.on).map((on) => (
                <li className="list-disc text-gray-500 leading-3" key={on}>
                  {on}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <CustomSourceHandle
        type="source"
        position={Position.Right}
        connectionLimit={20}
      />
    </>
  );
});
