import { type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

interface CategoryCardProps
  extends React.ComponentProps<"div"> {
  title: string;
  icon: LucideIcon;
  path: string;
}

export const CategoryCard = ({ className, title, icon: Icon, path }: CategoryCardProps) => {
  const [_, navigate] = useLocation();

  return (
    <Card
      onClick={() => navigate(path)}
      className={cn("relative cursor-pointer bg-background border-none p-0", className)}
    >
      <span className="absolute bg-border top-0 left-0 right-0 bottom-0 rounded-md"></span>
      <div className="relative -translate-y-2 border-2 rounded-md p-2 bg-background hover:-translate-y-3 active:-translate-y-1">
        <div className="mb-4 inline-flex p-3 rounded-xl">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-3xl font-bold mb-2 text-foreground">{title}</h3>
      </div>
    </Card>
  );
};
