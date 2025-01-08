export const runsOnOptions: Record<
  "ubuntu" | "windows" | "mac",
  { label: string; value: string }[]
> = {
  ubuntu: [
    {
      label: "ubuntu-latest",
      value: "ubuntu-latest",
    },

    {
      label: "ubuntu-24.04",
      value: "ubuntu-24.04",
    },
    {
      label: "ubuntu-22.04",
      value: "ubuntu-22.04",
    },
    {
      label: "ubuntu-20.04",
      value: "ubuntu-20.04",
    },
  ],
  windows: [
    {
      label: "windows-latest",
      value: "windows-latest",
    },
    {
      label: "windows-2022",
      value: "windows-2022",
    },
    {
      label: "windows-2019",
      value: "windows-2019",
    },
  ],
  mac: [
    {
      label: "macos-13",
      value: "macos-13",
    },
    {
      label: "macos-latest",
      value: "macos-latest",
    },
    {
      label: "macos-14",
      value: "macos-14",
    },
  ],
};
