import { ArrowLeft, Moon, Sun } from "lucide-react";
import IconSwitch from "./ui/icon-switch";
import { useTheme } from "@/contexts/theme-context";
import { Button } from "./ui/button";
import { useLocation } from "wouter";

const MainNav = () => {
  const { theme, toggleTheme } = useTheme();
  const [location, navigate] = useLocation();

  return (
    <div className="w-full p-2 flex justify-between">
      <Button
        onClick={() => navigate("/")}
      >
        <ArrowLeft />
        Back
      </Button>
      <IconSwitch
        defaultChecked={theme == 'dark'}
        uncheckedIcon={<Moon />}
        checkedIcon={<Sun />}
        onClick={toggleTheme}
      />
    </div>
  );
};

export default MainNav;
