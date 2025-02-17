import { Node, NodeProps, Position } from "@xyflow/react";
import { NetworkIcon } from "lucide-react";
import { memo } from "react";

import { CustomSourceHandle } from "@/features/flow/components/handle/custom-source-handle";
import { WorkflowData } from "@/features/flow/types/workflow-data";
import { cn } from "@/lib/utils";

export const WorkflowNode = memo(({ data, selected }: NodeProps<Node<WorkflowData>>) => {
  return (
    <>
      <div className={cn(
        "pb-4 text-sm border-2 bg-white dark:bg-slate-950 flex w-64 max-w-64 flex-col gap-2 rounded shadow duration-200 transition-all",
        selected && "border-blue-500 dark:border-blue-700 [box-shadow:0_0_20px_0_rgba(56,189,248,.4)]",
      )}>
        <div className="flex items-center gap-2 py-2 bg-slate-100 dark:bg-slate-900 px-3 rounded">
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

WorkflowNode.displayName = "WorkflowNode";
