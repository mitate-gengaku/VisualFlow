import { describe, expect, it } from "vitest";

import { TransformDataClass } from "@/features/flow/utils/transform-data";

const data = {
  nodes: [
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
        height: 90,
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
        height: 88,
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
        height: 88,
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
        height: 88,
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
        height: 88,
      },
    },
  ],
  edges: [
    {
      source: "43EEc0lxw866DXd5f917g==",
      target: "43EEc0lxw866DXdgUf917g==",
      type: "step",
      id: "xy-edge__1-2",
      animated: true,
    },
    {
      source: "43EEc0lxw866DXd5f917g==",
      target: "wKoMFVD8b0rb2FR56EUyOw==",
      type: "step",
      id: "xy-edge__1-3",
      animated: true,
    },
    {
      source: "43EEc0lxw866DXdgUf917g==",
      target: "38I9wMdUhwKKvujX++Te5g==",
      type: "step",
      id: "xy-edge__2-4",
      animated: true,
    },
    {
      source: "wKoMFVD8b0rb2FR56EUyOw==",
      target: "38I9wMdUhwKKvujX++Te5g==",
      type: "step",
      id: "xy-edge__3-4",
      animated: true,
    },
    {
      source: "38I9wMdUhwKKvujX++Te5g==",
      target: "0IaZQFAgSX36gOf9UwDrEA==",
      type: "step",
      id: "xy-edge__4-5",
      animated: true,
    },
  ],
  viewport: {
    x: -84.18181818181813,
    y: 175.35950413223142,
    zoom: 0.9245867768595041,
  },
  created_at: "2025-01-10T02:36:36.330Z",
  updated_at: "2025-01-10T02:36:36.331Z",
};

describe("TransformDataClassのテスト", () => {
  it("エッジのデータを階層構造に変換する", () => {
    const TransformData = new TransformDataClass(data.nodes, data.edges);

    const result = TransformData.transformData(data.edges);

    expect(result).toStrictEqual({
      "43EEc0lxw866DXd5f917g==": {
        "43EEc0lxw866DXdgUf917g==": {
          "38I9wMdUhwKKvujX++Te5g==": {
            "0IaZQFAgSX36gOf9UwDrEA==": {},
          },
        },
        "wKoMFVD8b0rb2FR56EUyOw==": {
          "38I9wMdUhwKKvujX++Te5g==": {
            "0IaZQFAgSX36gOf9UwDrEA==": {},
          },
        },
      },
    });
  });
  it("階層構造に変更したエッジにノードのデータを紐付ける", () => {
    const TransformData = new TransformDataClass(data.nodes, data.edges);

    const transform = TransformData.transformData(data.edges);
    const replaced = TransformData.replaceIdsWithNodes(transform, data.nodes);

    expect(replaced).toStrictEqual([
      {
        children: [
          {
            children: [
              {
                children: [
                  {
                    children: [],
                    data: {
                      name: "step2",
                      run: "echo 'Hello World'",
                    },
                    type: "step",
                  },
                ],
                data: {
                  name: "step1",
                  run: "echo 'Hello World'",
                },
                type: "step",
              },
            ],
            data: {
              job_id: "job_1",
              name: "job1",
              "runs-on": "ubuntu-latest",
            },
            type: "job",
          },
          {
            children: [
              {
                children: [
                  {
                    children: [],
                    data: {
                      name: "step2",
                      run: "echo 'Hello World'",
                    },
                    type: "step",
                  },
                ],
                data: {
                  name: "step1",
                  run: "echo 'Hello World'",
                },
                type: "step",
              },
            ],
            data: {
              job_id: "job_2",
              name: "job2",
              "runs-on": "ubuntu-latest",
            },
            type: "job",
          },
        ],
        data: {
          name: "workflow1",
          on: {
            workflow_dispatch: {},
          },
        },
        type: "workflow",
      },
    ]);
  });

  it("ノードのデータがないundefined・nullの場合、空配列が返る", () => {
    const TransformData = new TransformDataClass([], data.edges);

    const replaced = TransformData.replaceIdsWithNodes(null, []);

    expect(replaced).toEqual([]);
  });

  it("ノードのデータを紐付けたオブジェクトをJSON構造に変換する", () => {
    const TransformData = new TransformDataClass(data.nodes, data.edges);

    const transform = TransformData.transformData(data.edges);
    const replaced = TransformData.replaceIdsWithNodes(transform, data.nodes);
    const result = TransformData.convertToWorkflowFormat(replaced);

    expect(result).toStrictEqual({
      jobs: {
        job_1: {
          name: "job1",
          "runs-on": "ubuntu-latest",
          steps: [
            {
              name: "step1",
              run: "echo 'Hello World'",
            },
            {
              name: "step2",
              run: "echo 'Hello World'",
            },
          ],
        },
        job_2: {
          name: "job2",
          "runs-on": "ubuntu-latest",
          steps: [
            {
              name: "step1",
              run: "echo 'Hello World'",
            },
            {
              name: "step2",
              run: "echo 'Hello World'",
            },
          ],
        },
      },
      name: "workflow1",
      on: {
        workflow_dispatch: {},
      },
    });
  });

  it("YAML文字列に変換する", () => {
    const TransformData = new TransformDataClass(data.nodes, data.edges);
    const str = TransformData.generateYaml();

    expect(str).toBe(`name: workflow1
on:
  workflow_dispatch: {}
jobs:
  job_1:
    name: job1
    runs-on: ubuntu-latest
    steps:
      - name: step1
        run: echo 'Hello World'
      - name: step2
        run: echo 'Hello World'
  job_2:
    name: job2
    runs-on: ubuntu-latest
    steps:
      - name: step1
        run: echo 'Hello World'
      - name: step2
        run: echo 'Hello World'
`);
  });

  it("ノードが接続されていないとき、エラーメッセージが返る", () => {
    const TransformData = new TransformDataClass([], data.edges);
    const str = TransformData.generateYaml();

    expect(str).toBe("接続が正しくありません。");
  });
});
