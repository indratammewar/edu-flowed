import { Bell, Pin } from "lucide-react";
import { DashboardCard } from "./DashboardCard";
import { Badge } from "@/components/ui/badge";

const announcements = [
  {
    id: 1,
    title: "Midterm Exam Schedule Released",
    content: "The midterm examination schedule for all courses has been published. Please check your student portal for specific dates and times.",
    date: "2 hours ago",
    priority: "urgent" as const,
    pinned: true,
  },
  {
    id: 2,
    title: "Library Extended Hours",
    content: "The university library will be open 24/7 during exam week to support your studies.",
    date: "1 day ago",
    priority: "moderate" as const,
    pinned: false,
  },
  {
    id: 3,
    title: "New Course Materials Available",
    content: "Updated lecture notes and study materials for Computer Science 101 are now available in the course portal.",
    date: "2 days ago",
    priority: "low" as const,
    pinned: false,
  },
];

export function RecentAnnouncements() {
  return (
    <DashboardCard
      title="Recent Announcements"
      action={{
        label: "View All",
        onClick: () => {
          // Navigate to announcements page
        },
        variant: "outline"
      }}
    >
      <div className="space-y-3">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="p-3 bg-background rounded-lg border border-border/50 hover:border-border transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                {announcement.pinned ? (
                  <Pin className="w-4 h-4 text-primary" />
                ) : (
                  <Bell className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm text-foreground truncate">
                    {announcement.title}
                  </h4>
                  <Badge 
                    className={`text-xs ${
                      announcement.priority === "urgent" 
                        ? "bg-urgent text-urgent-foreground"
                        : announcement.priority === "moderate"
                        ? "bg-moderate text-moderate-foreground"
                        : "bg-low text-low-foreground"
                    }`}
                  >
                    {announcement.priority}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {announcement.content}
                </p>
                <p className="text-xs text-muted-foreground">
                  {announcement.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}