import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { DashboardCard } from "./DashboardCard";
import { Progress } from "@/components/ui/progress";

const attendanceData = {
  currentWeek: 92,
  lastWeek: 87,
  trend: "up" as const,
  totalClasses: 12,
  attendedClasses: 11,
  missedClasses: 1,
};

export function AttendanceOverview() {
  const trendIcon = attendanceData.trend === "up" ? TrendingUp : TrendingDown;
  const trendColor = attendanceData.trend === "up" ? "text-success" : "text-urgent";
  
  return (
    <DashboardCard
      title="Attendance Overview"
      badge={{
        text: `${attendanceData.currentWeek}%`,
        variant: attendanceData.currentWeek >= 90 ? "low" : 
               attendanceData.currentWeek >= 75 ? "moderate" : "urgent"
      }}
      action={{
        label: "View Details",
        onClick: () => {
          // Navigate to attendance page
        }
      }}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">This Week</span>
            <div className={`flex items-center gap-1 ${trendColor}`}>
              <span className="font-medium">{attendanceData.currentWeek}%</span>
              {React.createElement(trendIcon, { className: "w-3 h-3" })}
            </div>
          </div>
          <Progress 
            value={attendanceData.currentWeek} 
            className="h-2"
          />
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 bg-background rounded-lg border border-border/50">
            <div className="text-lg font-semibold text-foreground">
              {attendanceData.totalClasses}
            </div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div className="p-3 bg-background rounded-lg border border-border/50">
            <div className="text-lg font-semibold text-success">
              {attendanceData.attendedClasses}
            </div>
            <div className="text-xs text-muted-foreground">Attended</div>
          </div>
          <div className="p-3 bg-background rounded-lg border border-border/50">
            <div className="text-lg font-semibold text-urgent">
              {attendanceData.missedClasses}
            </div>
            <div className="text-xs text-muted-foreground">Missed</div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}