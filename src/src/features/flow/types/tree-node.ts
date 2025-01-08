import { JobData } from "@/features/flow/types/job-data";
import { StepData } from "@/features/flow/types/step-data";
import { WorkflowData } from "@/features/flow/types/workflow-data";

export interface TreeNode {
  data: Partial<WorkflowData & JobData & StepData>;
  type: string;
  children: TreeNode[];
}
