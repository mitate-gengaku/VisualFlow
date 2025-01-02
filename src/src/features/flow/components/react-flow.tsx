"use client"

import { useState, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
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
} from '@xyflow/react'; 
import { atom, useAtom } from 'jotai';
import { ControlPanel } from './control-panel';
import { WorkflowNode } from './workflow-node';
import { JobNode } from './job-node';

const initialNodes: Node[] = [
  {
    id: '1',
    data: { label: 'Hello' },
    position: { x: 0, y: 0 },
    type: 'workflow',
  },
  {
    id: '2',
    data: { label: 'World' },
    position: { x: 300, y: 0 },
    type: 'job'
  },
  {
    id: '3',
    data: { label: 'World' },
    position: { x: 600, y: 0 },
    type: 'job'
  },
  {
    id: '4',
    data: { label: 'World' },
    position: { x: 900, y: 0 },
    type: 'step'
  },
  {
    id: '5',
    data: { label: 'World' },
    position: { x: 1200, y: 0 },
    type: 'step'
  },
];
 
const initialEdges: Edge[] = [];

const nodesAtom = atom<Node[]>(initialNodes)
const edgesAtom = atom<Edge[]>(initialEdges)
 
export const Flow = () => {
  const [nodes, setNodes] = useAtom(nodesAtom);
  const [edges, setEdges] = useAtom(edgesAtom);
 
  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );
  
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const nodeTypes = {
    workflow: WorkflowNode,
    job: JobNode,
  };
  const edgeTypes = {};

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      panOnScroll
      selectionOnDrag
      panOnDrag={[1, 2]}
      selectionMode={SelectionMode.Partial}
      >
      <ControlPanel />
      <Background />
      <MiniMap />
    </ReactFlow>
  )
}