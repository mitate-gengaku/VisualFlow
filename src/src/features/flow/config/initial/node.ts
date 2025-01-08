import { Node } from "@xyflow/react";

export const initialNodes: Node[] = [
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
