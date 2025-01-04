export interface WorkflowOutput {
  name: string;
  on: { [key: string]: any };
  jobs: {
    [key: string]: {
      name: string;
      'runs-on': string;
      steps: { name: string; run: string }[];
    };
  };
}