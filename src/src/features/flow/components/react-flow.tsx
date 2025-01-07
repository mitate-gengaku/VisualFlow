"use client";

import {
  ReactFlow,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  addEdge,
  Connection,
  SelectionMode,
  MiniMap,
  ReactFlowJsonObject,
  reconnectEdge,
} from "@xyflow/react";
import { atom, useAtom, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useCallback, useRef } from "react";

import { ControlPanel } from "@/features/flow/components/controls/control-panel";
import { ErrorEdge } from "@/features/flow/components/error-edge";
import { JobNode } from "@/features/flow/components/job-node";
import { StepNode } from "@/features/flow/components/step-node";
import { WorkflowNode } from "@/features/flow/components/workflow-node";

import { initialEdges } from "@/features/flow/config/initial/edge";
import { initialNodes } from "@/features/flow/config/initial/node";

const generateStorageKey = () => {
  return `save-data-${new Date().toLocaleDateString("sv-SV").toString()}`;
};

export interface FlowData extends ReactFlowJsonObject<Node, Edge> {
  created_at: string;
  updated_at: string;
}

export const nodesAtom = atom<Node[]>(initialNodes);
export const edgesAtom = atom<Edge[]>(initialEdges);
export const connectionAtom = atom<Connection | undefined>(undefined);
export const workflowCodeAtom = atom<string>("");
export const saveDataAtom = atomWithStorage<FlowData | undefined>(
  generateStorageKey(),
  undefined,
);

export const Flow = () => {
  const edgeReconnectSuccessful = useRef(true);

  const [nodes, setNodes] = useAtom(nodesAtom);
  const [edges, setEdges] = useAtom(edgesAtom);
  const setConnection = useSetAtom(connectionAtom);

  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect = useCallback((connection: Connection) => {
    setConnection(connection);
    setEdges((eds) =>
      addEdge({ ...connection, type: "step", animated: true }, eds),
    );
  }, []);

  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);

  const onReconnect = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      edgeReconnectSuccessful.current = true;
      setEdges((edge) => reconnectEdge(oldEdge, newConnection, edge));
    },
    [],
  );

  const onReconnectEnd = useCallback(
    (_: MouseEvent | TouchEvent, edge: Edge) => {
      if (!edgeReconnectSuccessful.current) {
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      }

      edgeReconnectSuccessful.current = true;
    },
    [],
  );

  const isValidConnection = (connection: Connection | Edge) => {
    const { source, target } = connection;

    const sourceNode = nodes.find((node) => node.id === source);
    const targetNode = nodes.find((node) => node.id === target);

    const exist = edges.find((edge) => edge.target === target);
    const existNode = exist && nodes.find((node) => node.id === exist.source);
    const existNodeTypeIsJob = existNode && existNode.type === "job";

    if (!sourceNode || !targetNode) return false;

    if (source === target) return false;

    if (
      sourceNode.type === "job" &&
      targetNode.type === "step" &&
      exist &&
      !existNodeTypeIsJob
    )
      return false;
    if (sourceNode.type === "step" && targetNode.type === "step" && exist)
      return false;

    if (sourceNode.type === "workflow" && targetNode.type === "job")
      return true;
    if (sourceNode.type === "workflow" && targetNode.type === "step")
      return false;

    if (sourceNode.type === "job" && targetNode.type === "step") return true;

    if (sourceNode.type === "step" && targetNode.type === "step") return true;
    if (source === target) return false;

    return false;
  };

  const nodeTypes = {
    workflow: WorkflowNode,
    job: JobNode,
    step: StepNode,
  };

  const edgeTypes = {
    error: ErrorEdge,
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onReconnectStart={onReconnectStart}
      onReconnect={onReconnect}
      onReconnectEnd={onReconnectEnd}
      isValidConnection={isValidConnection}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      snapToGrid={true}
      snapGrid={[25, 25]}
      fitView
      fitViewOptions={{
        duration: 1000,
      }}
      panOnScroll
      selectionOnDrag
      panOnDrag={[1, 2]}
      selectionMode={SelectionMode.Partial}
    >
      <ControlPanel />
      <Background />
      <MiniMap />
    </ReactFlow>
  );
};
