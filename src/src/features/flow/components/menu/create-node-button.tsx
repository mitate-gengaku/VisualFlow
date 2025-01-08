"use client";

import { Button } from "@/components/ui/button";
import { useHandleNode } from "@/features/flow/hooks/use-handle-node";

interface Props {
  type: "workflow" | "job" | "step";
}

export const CraeteNodeButton = ({ type }: Props) => {
  const { onCreateNode } = useHandleNode();

  return (
    <Button
      variant="outline"
      size="sm"
      className="h-6 rounded-sm"
      onClick={() => onCreateNode(type)}
    >
      追加
    </Button>
  );
};
