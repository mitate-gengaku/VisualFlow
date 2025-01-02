import { DownloadForm } from "@/features/download/components/download-form";
import { Flow } from "@/features/flow/components/react-flow";
import Image from "next/image";

export default function Home() {
  return (
    <div
      className='flex relative font-noto-sans-jp'
      style={{ width: '100vw', height: '100vh' }}
      >
      <Flow />
    </div>
  );
}
