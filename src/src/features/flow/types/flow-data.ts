import { Edge, Node, ReactFlowJsonObject } from "@xyflow/react";

export interface FlowData extends ReactFlowJsonObject<Node, Edge> {
  created_at: string;
  updated_at: string;
}
