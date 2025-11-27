import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TransactionItemProps {
  icon: LucideIcon;
  title: string;
  date: string;
  amount: string;
  positive: boolean;
}

export const TransactionItem = ({ icon: Icon, title, date, amount, positive }: TransactionItemProps) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
      <div className={cn(
        "p-3 rounded-lg",
        positive ? "bg-success/10" : "bg-muted"
      )}>
        <Icon size={20} className={positive ? "text-success" : "text-muted-foreground"} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{title}</p>
        <p className="text-xs text-muted-foreground">{date}</p>
      </div>
      <span className={cn(
        "font-bold text-sm",
        positive ? "text-success" : "text-foreground"
      )}>
        {positive ? "+" : "-"} {amount}
      </span>
    </div>
  );
};
