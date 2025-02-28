import { Edge, Node } from "@xyflow/react";
import YAML from "yaml";

import { ResultNode } from "@/features/flow/types/result-node";
import { TreeNode } from "@/features/flow/types/tree-node";
import { WorkflowOutput } from "@/features/flow/types/workflow-output";

export class TransformDataClass {
  constructor(
    private nodes: Node[],
    private edges: Edge[],
  ) {}

  transformData(edges: Edge[]): ResultNode {
    const result: ResultNode = {};

    const nodeRelations: {
      [key: string]: { parents: Set<string>; children: Set<string> };
    } = {};

    edges.forEach((edge) => {
      if (!nodeRelations[edge.source]) {
        nodeRelations[edge.source] = {
          parents: new Set(),
          children: new Set(),
        };
      }
      if (!nodeRelations[edge.target]) {
        nodeRelations[edge.target] = {
          parents: new Set(),
          children: new Set(),
        };
      }
      nodeRelations[edge.source].children.add(edge.target);
      nodeRelations[edge.target].parents.add(edge.source);
    });

    const rootNodes = Object.keys(nodeRelations).filter(
      (node) => nodeRelations[node].parents.size === 0,
    );

    function buildNodeStructure(node: string): ResultNode {
      const children = nodeRelations[node].children;
      const nodeStructure: ResultNode = {};

      children.forEach((child) => {
        nodeStructure[child] = buildNodeStructure(child);
      });

      return nodeStructure;
    }

    rootNodes.forEach((rootNode) => {
      result[rootNode] = buildNodeStructure(rootNode);
    });

    return result;
  }

  replaceIdsWithNodes(
    transformedData: ResultNode,
    originalNodes: Node[],
  ): TreeNode[] {
    const nodeMap = new Map(originalNodes.map((node) => [node.id, node]));

    function replaceNode(node: ResultNode | null): TreeNode[] {
      if (node === null || node === undefined) {
        return [];
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result: any[] = [];
      for (const [key, value] of Object.entries(node)) {
        const matchedNode = nodeMap.get(key);
        if (matchedNode) {
          const { data, type } = matchedNode;
          result.push({
            data,
            type,
            children: replaceNode(value),
          });
        } else {
          const childNodes = replaceNode(value);
          if (childNodes.length >= 0) {
            result.push({
              id: key,
              children: childNodes,
            });
          }
        }
      }
      return result;
    }

    return replaceNode(transformedData);
  }

  convertToWorkflowFormat(input: TreeNode[]): WorkflowOutput {
    const workflow = input[0];
    const output: WorkflowOutput = {
      name: workflow.data.name as string,
      on: workflow.data.on!,
      jobs: {},
    };

    for (const job of workflow.children) {
      const jobId = job.data.job_id as string;
      output.jobs[jobId] = {
        name: job.data.name as string,
        "runs-on": job.data["runs-on"] as string,
        steps: [],
      };

      const processSteps = (steps: TreeNode[]) => {
        for (const step of steps) {
          output.jobs[jobId].steps.push({
            name: step.data.name as string,
            run: step.data.run as string,
          });
          if (step.children.length > 0) {
            processSteps(step.children);
          }
        }
      };

      processSteps(job.children);
    }

    return output;
  }

  generateYaml() {
    const tree = this.transformData(this.edges);
    const replaced = this.replaceIdsWithNodes(tree, this.nodes).filter(
      (v) => v.type === "workflow",
    );

    if (!replaced.length) {
      return "接続が正しくありません。";
    }

    const result = this.convertToWorkflowFormat(replaced);

    return YAML.stringify(result);
  }
}
