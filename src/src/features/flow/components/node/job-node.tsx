import { Node, NodeProps, Position } from "@xyflow/react";
import { LayoutGridIcon } from "lucide-react";
import { memo } from "react";

import { CustomSourceHandle } from "@/features/flow/components/handle/custom-source-handle";
import { CustomTargetHandle } from "@/features/flow/components/handle/custom-target-handle";
import { JobData } from "@/features/flow/types/job-data";
import { cn } from "@/lib/utils";

export const JobNode = memo(({ data, selected }: NodeProps<Node<JobData>>) => {
  return (
    <>
      <div className={cn(
        "pb-4 text-sm border bg-white dark:bg-slate-950 w-64 max-w-64 flex flex-col gap-2 rounded shadow duration-200 transition-all",
        selected && "border-blue-500 dark:border-blue-700 [box-shadow:0_0_20px_0_rgba(56,189,248,.4)]",
        )}>
        <div className="flex items-center gap-2 py-2 bg-slate-100 dark:bg-slate-900 px-3 rounded">
          <LayoutGridIcon className="size-3" />
          <p className="text-xs">{data.name}</p>
        </div>
        {data["runs-on"] && (
          <div className="px-3 text-[10px]">
            <h3>runs-on: </h3>
            <p className="leading-[1] text-gray-500">{data["runs-on"]}</p>
          </div>
        )}
      </div>
      <CustomTargetHandle
        type="target"
        position={Position.Left}
        connectionLimit={1}
      />
      <CustomSourceHandle
        type="source"
        position={Position.Right}
        connectionLimit={1}
      />
    </>
  );
});

JobNode.displayName = "JobNode";
