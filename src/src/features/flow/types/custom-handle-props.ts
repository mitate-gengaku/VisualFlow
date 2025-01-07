import { IsValidConnection, Position } from "@xyflow/react";

export interface CustomHandleProps {
  type: "source" | "target";
  position: Position;
  connectionLimit: number;
}