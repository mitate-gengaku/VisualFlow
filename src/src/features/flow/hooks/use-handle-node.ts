import { Node } from "@xyflow/react";
import { useAtom } from "jotai";
import { useMemo } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import { nodesAtom } from "@/features/flow/store/node";
import { JobData } from "@/features/flow/types/job-data";
import { StepData } from "@/features/flow/types/step-data";
import { WorkflowData } from "@/features/flow/types/workflow-data";

export const useHandleNode = () => {
  const [nodes, setNodes] = useAtom(nodesAtom);

  const workflows = useMemo(() => {
    return nodes.filter((v) => v.type === "workflow");
  }, [nodes]) as Node<WorkflowData>[];

  const jobs = useMemo(() => {
    return nodes.filter((v) => v.type === "job");
  }, [nodes]) as Node<JobData>[];

  const steps = useMemo(() => {
    return nodes.filter((v) => v.type === "step");
  }, [nodes]) as Node<StepData>[];

  const onCreateNode = (type: "workflow" | "job" | "step") => {
    if (type === "workflow" && workflows.length) {
      toast.error("Only one workflow can be generated");
      return;
    }

    if (type === "job" && jobs.length >= 20) {
      toast.error("Up to 20 jobs can be generated");
      return;
    }

    switch (type) {
      case "workflow":
        setNodes([
          ...nodes,
          {
            id: uuidv4(),
            position: {
              x: 0,
              y: workflows.length * 200,
            },
            data: {
              name: `workflow${workflows.length + 1}`,
              on: {
                workflow_dispatch: {},
              },
            },
            type: type,
          },
        ]);
        break;

      case "job":
        setNodes([
          ...nodes,
          {
            id: uuidv4(),
            position: {
              x: 400,
              y: jobs.length * 200,
            },
            data: {
              name: `job${jobs.length + 1}`,
              "runs-on": "ubuntu-latest",
              job_id: `job_${jobs.length + 1}`,
            },
            type: type,
          },
        ]);
        break;

      default:
        setNodes([
          ...nodes,
          {
            id: uuidv4(),
            position: {
              x: 800,
              y: steps.length * 200,
            },
            data: {
              run: "echo 'Hello World'",
            },
            type: type,
          },
        ]);
        break;
    }
  };

  const onUpdateNode = (
    id: string,
    newData: Partial<Node<WorkflowData | JobData | StepData>["data"]>,
  ) => {
    setNodes((prevNodes) => {
      return prevNodes.map((prevNode) => {
        if (prevNode.id === id) {
          return {
            ...prevNode,
            data: {
              ...prevNode.data,
              ...newData,
            },
          };
        }
        return prevNode;
      });
    });
  };

  return {
    workflows,
    jobs,
    steps,
    onCreateNode,
    onUpdateNode,
  };
};
