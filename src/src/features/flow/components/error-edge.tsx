import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getSmoothStepPath, useReactFlow } from "@xyflow/react";
import { CircleAlertIcon } from "lucide-react";

export function ErrorEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 0,
  });

  const onDelete = () => {
    setEdges((es) => es.filter((e) => e.id !== id));
  }

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} type="step" style={{ ...style }} className='!stroke-red-600 !z-10' />
      <EdgeLabelRenderer>
        <div
          className="nodrag nopan pointer-events-auto absolute"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className='bg-red-300 hover:bg-red-400 text-red-600 hover:text-red-700'
                  onClick={() => onDelete()}
                >
                  <CircleAlertIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                この接続は無効です
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
