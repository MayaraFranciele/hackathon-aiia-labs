import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  icon: LucideIcon;
  label: string;
  color: string;
}

export const CategoryBadge = ({ icon: Icon, label, color }: CategoryBadgeProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium",
        color
      )}
    >
      <Icon size={14} />
      <span>{label}</span>
    </div>
  );
};
