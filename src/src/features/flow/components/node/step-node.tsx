import { Node, NodeProps, Position } from "@xyflow/react";
import { useAtomValue } from "jotai";
import { BoxIcon } from "lucide-react";
import { memo } from "react";
import Markdown from "react-markdown";
import remarkBreaks from "remark-breaks";

import { CustomSourceHandle } from "@/features/flow/components/handle/custom-source-handle";
import { CustomTargetHandle } from "@/features/flow/components/handle/custom-target-handle";
import { connectionAtom } from "@/features/flow/store/connection";
import { nodesAtom } from "@/features/flow/store/node";
import { StepData } from "@/features/flow/types/step-data";
import { cn } from "@/lib/utils";

export const StepNode = memo(
  ({ id, data, selected }: NodeProps<Node<StepData>>) => {
    const nodes = useAtomValue(nodesAtom);
    const connection = useAtomValue(connectionAtom);
    const sourceNode = nodes.find((node) => node.id === connection?.source);

    return (
      <>
        <div
          className={cn(
            "pb-4 text-sm border bg-white dark:bg-slate-950 w-64 max-w-64 flex flex-col gap-2 rounded shadow duration-200 transition-all",
            selected &&
              "border-blue-500 dark:border-blue-700 [box-shadow:0_0_20px_0_rgba(56,189,248,.4)]",
          )}
        >
          <div className="flex items-center gap-2 py-2 bg-slate-100 dark:bg-slate-900 px-3 rounded-tr rounded-tl">
            <BoxIcon className="size-3" />
            <p className="text-xs">{data.name ? data.name : id}</p>
          </div>
          {data.run && (
            <div className="px-3 text-[10px]">
              <h3>run: </h3>
              <Markdown
                remarkPlugins={[remarkBreaks]}
                className="leading-[1] text-gray-500"
              >
                {data.run}
              </Markdown>
            </div>
          )}
        </div>
        <CustomTargetHandle
          type="target"
          position={Position.Left}
          connectionLimit={sourceNode?.type === "step" ? 1 : 20}
        />
        <CustomSourceHandle
          type="source"
          position={Position.Right}
          connectionLimit={1}
        />
      </>
    );
  },
);

StepNode.displayName = "StepNode";
