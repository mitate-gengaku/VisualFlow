import { Edge, Node } from "@xyflow/react";

import { FlowData } from "@/features/flow/types/flow-data";

export function getMatchingLocalStorageData(regexPattern: string): FlowData[] {
  const matchingData: FlowData[] = [];
  if (typeof localStorage === "undefined") return [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && new RegExp(regexPattern).test(key)) {
      try {
        const value = JSON.parse(localStorage.getItem(key) || "") as FlowData;

        if (
          Array.isArray(value.nodes) &&
          Array.isArray(value.edges) &&
          typeof value.viewport === "object" &&
          typeof value.viewport.x === "number" &&
          typeof value.viewport.y === "number" &&
          typeof value.viewport.zoom === "number" &&
          typeof value.created_at === "string" &&
          typeof value.updated_at === "string"
        ) {
          const validNodes = value.nodes.every(
            (node: Node) =>
              typeof node.id === "string" &&
              typeof node.data === "object" &&
              typeof node.position === "object" &&
              typeof node.position.x === "number" &&
              typeof node.position.y === "number" &&
              typeof node.type === "string" &&
              typeof node.measured === "object" &&
              typeof node.measured.width === "number" &&
              typeof node.measured.height === "number",
          );

          const validEdges = value.edges.every(
            (edge: Edge) =>
              typeof edge.source === "string" &&
              typeof edge.target === "string" &&
              typeof edge.type === "string" &&
              typeof edge.id === "string" &&
              typeof edge.animated === "boolean",
          );

          if (validNodes && validEdges) {
            matchingData.push(value as FlowData);
          }
        }
      } catch (error) {
        console.error(
          `Error parsing localStorage item with key ${key}:`,
          error,
        );
      }
    }
  }

  const result = matchingData.sort((prev, next) =>
    new Date(prev.created_at) < new Date(next.created_at) ? 1 : -1,
  );
  return result;
}
