import { ReactFlowProvider } from "@xyflow/react";

import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { HeaderMenu } from "@/features/flow/components/menu/header-menu";

export const TopPage = () => {
  return (
    <ReactFlowProvider>
      <Header>
        <HeaderMenu />
      </Header>
      <Main />
    </ReactFlowProvider>
  );
};
