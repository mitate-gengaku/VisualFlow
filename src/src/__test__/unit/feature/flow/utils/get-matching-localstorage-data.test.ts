import { describe, expect, it, vi } from "vitest";

import { generateStorageKey } from "@/features/flow/utils/generate-storage-key";
import { getMatchingLocalStorageData } from "@/features/flow/utils/get-matching-localstorage-data";

const data1 = {
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

const data2 = {
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
  created_at: "2025-01-16T02:36:36.330Z",
  updated_at: "2025-01-16T02:36:36.331Z",
};

const data3 = {
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
  created_at: "2025-01-12T02:36:36.330Z",
  updated_at: "2025-01-12T02:36:36.331Z",
};

describe("getMatchingLocalStorageDataのテスト", () => {
  it("localStorageがundefinedのとき、空配列が返る", () => {
    vi.stubGlobal("localStorage", undefined);

    const result = getMatchingLocalStorageData("save-data-");

    expect(result).toEqual([]);
    expect(result.length).toBe(0);

    vi.unstubAllGlobals();
  });

  it("localStorageに保存データがない場合、空配列が返る", () => {
    const key = generateStorageKey();

    localStorage.setItem(key, JSON.stringify({}));

    const result = getMatchingLocalStorageData("matching_key");

    expect(result).toEqual([]);
  });

  it("保存データのキー名が間違っている場合、空配列が返る", () => {
    localStorage.setItem("save-data-2025-01-10", JSON.stringify(data1));
    localStorage.setItem("save-data-2025-01-11", JSON.stringify(data2));
    localStorage.setItem("save-data-2025-01-12", JSON.stringify(data3));

    const result = getMatchingLocalStorageData("save-datb");

    expect(result).toStrictEqual([]);
    expect(result.length).toBe(0);
  });

  it("正しいフォーマットの保存データが見つかった場合、データが配列で返る", () => {
    localStorage.setItem("save-data-2025-01-10", JSON.stringify(data1));
    localStorage.setItem("save-data-2025-01-11", JSON.stringify(data2));
    localStorage.setItem("save-data-2025-01-12", JSON.stringify(data3));

    const result = getMatchingLocalStorageData("save-data");

    expect(result).toStrictEqual([data2, data3, data1]);
    expect(result.length).toBe(3);
    expect(result[0].created_at).toBe("2025-01-16T02:36:36.330Z");
    expect(result[1].created_at).toBe("2025-01-12T02:36:36.330Z");
    expect(result[2].created_at).toBe("2025-01-10T02:36:36.330Z");
  });
});
