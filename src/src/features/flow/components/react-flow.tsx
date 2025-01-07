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

import { ControlPanel } from "./control-panel";
import { ErrorEdge } from "./error-edge";
import { JobNode } from "./job-node";
import { StepNode } from "./step-node";
import { WorkflowNode } from "./workflow-node";

const initialNodes: Node[] = [
  {
    id: "43EEc0lxw866DXd5f917g==",
    data: {
      name: "workflow1",
      on: {
        workflow_dispatch: {},
      },
    },
    position: {
      x: 0,
      y: 0,
    },
    type: "workflow",
    measured: {
      width: 256,
      height: 98,
    },
  },
  {
    id: "43EEc0lxw866DXdgUf917g==",
    data: {
      job_id: "job_1",
      name: "job1",
      "runs-on": "ubuntu-latest",
    },
    position: {
      x: 400,
      y: 0,
    },
    type: "job",
    measured: {
      width: 256,
      height: 118,
    },
  },
  {
    id: "wKoMFVD8b0rb2FR56EUyOw==",
    data: {
      job_id: "job_2",
      name: "job2",
      "runs-on": "ubuntu-latest",
    },
    position: {
      x: 400,
      y: 200,
    },
    type: "job",
    measured: {
      width: 256,
      height: 118,
    },
  },
  {
    id: "38I9wMdUhwKKvujX++Te5g==",
    data: {
      name: "step1",
      run: "echo 'Hello World'",
    },
    position: {
      x: 800,
      y: 0,
    },
    type: "step",
    measured: {
      width: 256,
      height: 98,
    },
  },
  {
    id: "0IaZQFAgSX36gOf9UwDrEA==",
    data: {
      name: "step2",
      run: "echo 'Hello World'",
    },
    position: {
      x: 800,
      y: 200,
    },
    type: "step",
    measured: {
      width: 256,
      height: 98,
    },
  },
];

const initialEdges: Edge[] = [
  {
    source: "43EEc0lxw866DXd5f917g==",
    target: "43EEc0lxw866DXdgUf917g==",
    type: "step",
    id: "xy-edge__1-2",
    animated: true,
  },
  {
    source: "43EEc0lxw866DXd5f917g==",
    target: "wKoMFVD8b0rb2FR56EUyOw==",
    type: "step",
    id: "xy-edge__1-3",
    animated: true,
  },
  {
    source: "43EEc0lxw866DXdgUf917g==",
    target: "38I9wMdUhwKKvujX++Te5g==",
    type: "step",
    id: "xy-edge__2-4",
    animated: true,
  },
  {
    source: "wKoMFVD8b0rb2FR56EUyOw==",
    target: "38I9wMdUhwKKvujX++Te5g==",
    type: "step",
    id: "xy-edge__3-4",
    animated: true,
  },
  {
    source: "38I9wMdUhwKKvujX++Te5g==",
    target: "0IaZQFAgSX36gOf9UwDrEA==",
    type: "step",
    id: "xy-edge__4-5",
    animated: true,
  },
];

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
  const [workflowCode, setWorkflowCode] = useAtom(workflowCodeAtom);
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
      isValidConnection={(connection) => {
        const { source, target } = connection;

        const sourceNode = nodes.find((node) => node.id === source);
        const targetNode = nodes.find((node) => node.id === target);

        const exist = edges.find((edge) => edge.target === target);
        const existNode =
          exist && nodes.find((node) => node.id === exist.source);
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

        if (sourceNode.type === "job" && targetNode.type === "step")
          return true;

        if (sourceNode.type === "step" && targetNode.type === "step")
          return true;
        if (source === target) return false;

        return false;
      }}
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
