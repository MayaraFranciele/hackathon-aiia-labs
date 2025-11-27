import { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";

interface QuickActionProps {
  icon: LucideIcon;
  label: string;
}

export const QuickAction = ({ icon: Icon, label }: QuickActionProps) => {
  return (
    <Button
      variant="outline"
      className="flex flex-col items-center gap-2 h-auto py-6 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-200"
    >
      <Icon size={24} className="text-primary" />
      <span className="text-sm font-medium text-foreground hover:text-primary">
        {label}
      </span>
    </Button>
  );
};
