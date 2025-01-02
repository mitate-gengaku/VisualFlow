import { Flow } from "@/features/flow/components/react-flow";
import { ReactFlowProvider } from "@xyflow/react";

export default function Home() {
  return (
    <ReactFlowProvider>
      <main className="w-full h-full">
        <Flow />
      </main>
    </ReactFlowProvider>
  );
}
