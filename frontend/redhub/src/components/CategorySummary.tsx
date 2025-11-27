import { LucideIcon } from "lucide-react";
import { Progress } from "./ui/progress";

interface CategorySummaryProps {
  icon: LucideIcon;
  label: string;
  amount: string;
  percentage: number;
  color: string;
}

export const CategorySummary = ({
  icon: Icon,
  label,
  amount,
  percentage,
  color,
}: CategorySummaryProps) => {
  return (
    <div className="space-y-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${color}`}>
            <Icon size={18} />
          </div>
          <div>
            <p className="font-medium text-sm">{label}</p>
            <p className="text-xs text-muted-foreground">{percentage}% do total</p>
          </div>
        </div>
        <span className="font-bold text-sm">{amount}</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};
