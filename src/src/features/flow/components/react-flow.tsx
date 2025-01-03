"use client"

import { useState, useCallback, useRef } from 'react';
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
  OnInit,
  ReactFlowJsonObject,
  reconnectEdge,
} from '@xyflow/react'; 
import { atom, useAtom, useAtomValue } from 'jotai';
import { ControlPanel } from './control-panel';
import { WorkflowNode } from './workflow-node';
import { JobNode } from './job-node';
import { StepNode } from './step-node';
import { ErrorEdge } from './error-edge';
import { atomWithStorage } from 'jotai/utils';

const initialNodes: Node[] = [
  {
      "id": "1",
      "data": {
          "label": "Hello"
      },
      "position": {
          "x": 0,
          "y": 0
      },
      "type": "workflow",
      "measured": {
          "width": 256,
          "height": 98
      }
  },
  {
      "id": "2",
      "data": {
          "label": "World"
      },
      "position": {
          "x": 400,
          "y": 0
      },
      "type": "job",
      "measured": {
          "width": 256,
          "height": 118
      }
  },
  {
      "id": "3",
      "data": {
          "label": "World"
      },
      "position": {
          "x": 400,
          "y": 200
      },
      "type": "job",
      "measured": {
          "width": 256,
          "height": 118
      }
  },
  {
      "id": "4",
      "data": {
          "label": "World"
      },
      "position": {
          "x": 800,
          "y": 0
      },
      "type": "step",
      "measured": {
          "width": 256,
          "height": 98
      }
  },
  {
      "id": "5",
      "data": {
          "label": "World"
      },
      "position": {
          "x": 800,
          "y": 200
      },
      "type": "step",
      "measured": {
          "width": 256,
          "height": 98
      }
  }
]
 
const initialEdges: Edge[] = [
  {
      "source": "1",
      "target": "2",
      "type": "step",
      "id": "xy-edge__1-2",
      "animated": true,
  },
  {
      "source": "1",
      "target": "3",
      "type": "step",
      "id": "xy-edge__1-3",
      "animated": true,
  },
  {
      "source": "2",
      "target": "4",
      "type": "step",
      "id": "xy-edge__2-4",
      "animated": true,
  },
  {
      "source": "3",
      "target": "4",
      "type": "step",
      "id": "xy-edge__3-4",
      "animated": true,
  },
  {
      "source": "4",
      "target": "5",
      "type": "step",
      "id": "xy-edge__4-5",
      "animated": true,
  },
];

export const nodesAtom = atom<Node[]>(initialNodes)
export const edgesAtom = atom<Edge[]>(initialEdges)
export const instanceAtom = atomWithStorage<ReactFlowJsonObject<Node, Edge> | undefined>("save-data", undefined)
 
export const Flow = () => {
  const edgeReconnectSuccessful = useRef(true);

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
    (params: Connection) => setEdges((eds) => addEdge({ ...params, type: "smoothstep", animated: true }, eds)),
    [],
  );

  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, [])

  const onReconnect = useCallback((oldEdge: Edge, newConnection: Connection) => {
    edgeReconnectSuccessful.current = true;
    setEdges((edge) => reconnectEdge(oldEdge, newConnection, edge));
  }, [])

  const onReconnectEnd = useCallback((_: MouseEvent | TouchEvent, edge: Edge) => {
    if (!edgeReconnectSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeReconnectSuccessful.current = true;
  }, [])

  const nodeTypes = {
    workflow: WorkflowNode,
    job: JobNode,
    step: StepNode,
  };

  const edgeTypes = {
    error: ErrorEdge
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
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
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