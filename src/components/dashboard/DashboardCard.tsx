import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "secondary" | "outline";
  };
  badge?: {
    text: string;
    variant?: "urgent" | "moderate" | "low" | "default";
  };
  className?: string;
}

export function DashboardCard({ 
  title, 
  children, 
  action, 
  badge, 
  className 
}: DashboardCardProps) {
  return (
    <Card className={cn(
      "bg-gradient-card border-border/50 shadow-card hover:shadow-md transition-all duration-300 hover:-translate-y-1",
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">
            {title}
          </CardTitle>
          {badge && (
            <Badge 
              className={cn(
                "text-xs",
                badge.variant === "urgent" && "bg-urgent text-urgent-foreground",
                badge.variant === "moderate" && "bg-moderate text-moderate-foreground",
                badge.variant === "low" && "bg-low text-low-foreground",
                (!badge.variant || badge.variant === "default") && "bg-secondary text-secondary-foreground"
              )}
            >
              {badge.text}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {children}
        {action && (
          <Button
            onClick={action.onClick}
            variant={action.variant || "default"}
            size="sm"
            className="mt-4 w-full"
          >
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}