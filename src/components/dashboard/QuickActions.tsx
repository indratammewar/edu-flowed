import { Calendar, ClipboardList, MessageSquare, Users, Video } from "lucide-react";
import { DashboardCard } from "./DashboardCard";
import { Button } from "@/components/ui/button";

const quickActions = [
  {
    icon: Video,
    label: "Join Class",
    description: "Join your current class session",
    color: "bg-primary text-primary-foreground",
    action: () => {
      // Handle join class
    }
  },
  {
    icon: ClipboardList,
    label: "Submit Assignment",
    description: "Upload your completed work",
    color: "bg-accent text-accent-foreground",
    action: () => {
      // Handle submit assignment
    }
  },
  {
    icon: Users,
    label: "Mark Attendance",
    description: "Check in to today's classes",
    color: "bg-success text-success-foreground",
    action: () => {
      // Handle mark attendance
    }
  },
  {
    icon: MessageSquare,
    label: "Send Message",
    description: "Contact instructors or classmates",
    color: "bg-moderate text-moderate-foreground",
    action: () => {
      // Handle send message
    }
  },
];

export function QuickActions() {
  return (
    <DashboardCard title="Quick Actions">
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            onClick={action.action}
            className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-secondary-hover transition-colors"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color}`}>
              <action.icon className="w-5 h-5" />
            </div>
            <div className="text-center">
              <div className="font-medium text-sm">{action.label}</div>
              <div className="text-xs text-muted-foreground">
                {action.description}
              </div>
            </div>
          </Button>
        ))}
      </div>
    </DashboardCard>
  );
}