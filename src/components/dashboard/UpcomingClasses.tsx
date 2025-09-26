import { Clock, MapPin, Users } from "lucide-react";
import { DashboardCard } from "./DashboardCard";
import { Badge } from "@/components/ui/badge";

const upcomingClasses = [
  {
    id: 1,
    name: "Advanced Mathematics",
    time: "09:00 AM",
    room: "Room 101",
    instructor: "Dr. Smith",
    attendees: 28,
    status: "starting-soon" as const,
  },
  {
    id: 2,
    name: "Computer Science Fundamentals",
    time: "11:30 AM",
    room: "Lab 205",
    instructor: "Prof. Johnson",
    attendees: 24,
    status: "upcoming" as const,
  },
  {
    id: 3,
    name: "Data Structures",
    time: "02:00 PM",
    room: "Room 303",
    instructor: "Dr. Wilson",
    attendees: 32,
    status: "upcoming" as const,
  },
];

export function UpcomingClasses() {
  return (
    <DashboardCard
      title="Today's Classes"
      action={{
        label: "View All Classes",
        onClick: () => {
          // Navigate to classes page
        },
        variant: "outline"
      }}
    >
      <div className="space-y-4">
        {upcomingClasses.map((class_) => (
          <div
            key={class_.id}
            className="flex items-center justify-between p-3 bg-background rounded-lg border border-border/50 hover:border-border transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-foreground">{class_.name}</h4>
                {class_.status === "starting-soon" && (
                  <Badge className="bg-urgent text-urgent-foreground text-xs">
                    Starting Soon
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {class_.time}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {class_.room}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {class_.attendees}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {class_.instructor}
              </p>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}