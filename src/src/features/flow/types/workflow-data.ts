import { EmptyObject } from "@/features/flow/types/empty-object";

export type WorkflowData = {
  name: string;
  on: { [key: string]: string | EmptyObject };
};
