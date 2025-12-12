import MainNav from "@/components/main-nav";
import { type PropsWithChildren } from "react";

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <MainNav />
      {children}
    </div>
  );
};

export default MainLayout;
