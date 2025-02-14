import { Node, NodeProps, Position } from "@xyflow/react";
import { LayoutGridIcon } from "lucide-react";
import { memo } from "react";

import { CustomSourceHandle } from "@/features/flow/components/handle/custom-source-handle";
import { CustomTargetHandle } from "@/features/flow/components/handle/custom-target-handle";
import { JobData } from "@/features/flow/types/job-data";

export const JobNode = memo(({ data }: NodeProps<Node<JobData>>) => {
  return (
    <>
      <div className=" pb-4 text-sm border bg-white w-64 max-w-64 flex flex-col gap-2 rounded shadow">
        <div className="flex items-center gap-2 py-2 bg-slate-100 px-3">
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
