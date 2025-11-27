import { LucideIcon } from "lucide-react";
import { CategoryBadge } from "./CategoryBadge";
import { cn } from "@/lib/utils";

interface CategorizedTransactionProps {
  icon: LucideIcon;
  title: string;
  date: string;
  amount: string;
  positive: boolean;
  category: {
    icon: LucideIcon;
    label: string;
    color: string;
  };
}

export const CategorizedTransaction = ({
  icon: Icon,
  title,
  date,
  amount,
  positive,
  category,
}: CategorizedTransactionProps) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer group">
      <div
        className={cn(
          "p-3 rounded-lg transition-all duration-200 group-hover:scale-110",
          positive ? "bg-success/10" : "bg-muted"
        )}
      >
        <Icon size={20} className={positive ? "text-success" : "text-muted-foreground"} />
      </div>
      <div className="flex-1 min-w-0 space-y-1">
        <p className="font-medium text-sm truncate">{title}</p>
        <div className="flex items-center gap-2">
          <p className="text-xs text-muted-foreground">{date}</p>
          <CategoryBadge
            icon={category.icon}
            label={category.label}
            color={category.color}
          />
        </div>
      </div>
      <span
        className={cn(
          "font-bold text-sm whitespace-nowrap",
          positive ? "text-success" : "text-foreground"
        )}
      >
        {positive ? "+" : "-"} {amount}
      </span>
    </div>
  );
};
