import { EmptyObject } from "@/features/flow/types/empty-object";

export interface WorkflowOutput {
  name: string;
  on: { [key: string]: string | EmptyObject };
  jobs: {
    [key: string]: {
      name: string;
      "runs-on": string;
      steps: { name: string; run: string }[];
    };
  };
}
