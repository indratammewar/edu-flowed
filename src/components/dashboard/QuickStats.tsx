import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

interface StatItem {
  label: string;
  value: string;
  status: "safe" | "warning" | "critical";
  trend?: {
    direction: "up" | "down" | "stable";
    text: string;
  };
  link: string;
}

const stats: StatItem[] = [
  {
    label: "Overall Attendance",
    value: "68%",
    status: "critical",
    trend: {
      direction: "down",
      text: "Dropped 5% this month",
    },
    link: "/attendance",
  },
  {
    label: "Pending Assignments",
    value: "3",
    status: "warning",
    trend: {
      direction: "stable",
      text: "1 due within 24 hours",
    },
    link: "/assignments",
  },
  {
    label: "Current CGPA",
    value: "8.4",
    status: "safe",
    trend: {
      direction: "up",
      text: "+0.1 from last semester",
    },
    link: "/analytics",
  },
];

export function QuickStats() {
  const getStatusStyles = (status: StatItem["status"]) => {
    switch (status) {
      case "critical":
        return {
          bg: "bg-destructive/5 border-destructive/20 hover:border-destructive/40",
          value: "text-destructive",
          icon: AlertTriangle,
          iconColor: "text-destructive",
        };
      case "warning":
        return {
          bg: "bg-warning/5 border-warning/20 hover:border-warning/40",
          value: "text-warning",
          icon: AlertTriangle,
          iconColor: "text-warning",
        };
      case "safe":
        return {
          bg: "bg-success/5 border-success/20 hover:border-success/40",
          value: "text-success",
          icon: CheckCircle2,
          iconColor: "text-success",
        };
    }
  };

  const getTrendIcon = (direction: "up" | "down" | "stable") => {
    switch (direction) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-success" />;
      case "down":
        return <TrendingDown className="h-3 w-3 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {stats.map((stat) => {
        const styles = getStatusStyles(stat.status);
        const StatusIcon = styles.icon;

        return (
          <Link key={stat.label} to={stat.link}>
            <Card className={`${styles.bg} border transition-colors cursor-pointer`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {stat.label}
                  </span>
                  <StatusIcon className={`h-4 w-4 ${styles.iconColor}`} />
                </div>
                <div className={`text-2xl font-bold ${styles.value}`}>
                  {stat.value}
                </div>
                {stat.trend && (
                  <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
                    {getTrendIcon(stat.trend.direction)}
                    <span>{stat.trend.text}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
