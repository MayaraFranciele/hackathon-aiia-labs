import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: LucideIcon;
  gradient?: boolean;
}

export const StatCard = ({ title, value, change, positive, icon: Icon, gradient }: StatCardProps) => {
  return (
    <div className={cn(
      "rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
      gradient 
        ? "bg-gradient-primary text-white shadow-glow" 
        : "bg-card border border-border"
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "p-3 rounded-lg",
          gradient ? "bg-white/20" : "bg-primary/10"
        )}>
          <Icon size={24} className={gradient ? "text-white" : "text-primary"} />
        </div>
        <span className={cn(
          "text-sm font-medium px-2 py-1 rounded-full",
          positive 
            ? gradient ? "bg-white/20 text-white" : "bg-success/10 text-success"
            : gradient ? "bg-white/20 text-white" : "bg-destructive/10 text-destructive"
        )}>
          {change}
        </span>
      </div>
      <h3 className={cn(
        "text-sm font-medium mb-2",
        gradient ? "text-white/80" : "text-muted-foreground"
      )}>
        {title}
      </h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};
