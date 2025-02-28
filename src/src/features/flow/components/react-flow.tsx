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
  reconnectEdge,
  Panel,
} from "@xyflow/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useRef } from "react";

import { ControlPanel } from "@/features/flow/components/controls/control-panel";
import { DownloadPictureButton } from "@/features/flow/components/download/download-button";
import { ExportDialog } from "@/features/flow/components/export/export-dialog";
import { JobNode } from "@/features/flow/components/node/job-node";
import { StepNode } from "@/features/flow/components/node/step-node";
import { WorkflowNode } from "@/features/flow/components/node/workflow-node";
import { SaveDataDialog } from "@/features/flow/components/save-data/save-data-dialog";
import { connectionAtom } from "@/features/flow/store/connection";
import { edgesAtom } from "@/features/flow/store/edge";
import { nodesAtom } from "@/features/flow/store/node";
import { useIsTouchDevice } from "@/hooks/use-is-touch-device";
import { themeAtom } from "@/store/theme";

export const Flow = () => {
  const edgeReconnectSuccessful = useRef(true);

  const [nodes, setNodes] = useAtom(nodesAtom);
  const [edges, setEdges] = useAtom(edgesAtom);
  const theme = useAtomValue(themeAtom);
  const isTouchDevice = useIsTouchDevice();

  const setConnection = useSetAtom(connectionAtom);

  const onNodesChange = (changes: NodeChange<Node>[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  };

  const onEdgesChange = (changes: EdgeChange<Edge>[]) =>
    setEdges((eds) => applyEdgeChanges(changes, eds));

  const onConnect = (connection: Connection) => {
    setConnection(connection);
    setEdges((eds) =>
      addEdge({ ...connection, type: "step", animated: true }, eds),
    );
  };

  const onReconnectStart = () => {
    edgeReconnectSuccessful.current = false;
  };

  const onReconnect = (oldEdge: Edge, newConnection: Connection) => {
    edgeReconnectSuccessful.current = true;
    setEdges((edge) => reconnectEdge(oldEdge, newConnection, edge));
  };

  const onReconnectEnd = (_: MouseEvent | TouchEvent, edge: Edge) => {
    if (!edgeReconnectSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeReconnectSuccessful.current = true;
  };

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

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onReconnectStart={onReconnectStart}
      onReconnect={onReconnect}
      onReconnectEnd={onReconnectEnd}
      isValidConnection={isValidConnection}
      snapToGrid={true}
      snapGrid={[25, 25]}
      fitView
      fitViewOptions={{
        duration: 1000,
      }}
      panOnScroll
      selectionOnDrag={!isTouchDevice}
      panOnDrag={[1, 2]}
      selectionMode={SelectionMode.Partial}
      colorMode={theme}
    >
      <Panel position="top-right">
        <DownloadPictureButton />
      </Panel>
      <Panel position="bottom-left">
        <ControlPanel />
      </Panel>
      <Panel position="bottom-right">
        <MiniMap />
      </Panel>
      <Background />
      <ExportDialog />
      <SaveDataDialog />
    </ReactFlow>
  );
};
