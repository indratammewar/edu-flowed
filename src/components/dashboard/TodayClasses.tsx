import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, User, Video } from "lucide-react";

const todayClasses = [
  {
    id: 1,
    subject: "Data Structures & Algorithms",
    teacher: "Dr. Rajesh Kumar",
    time: "09:00 AM - 10:00 AM",
    room: "Room 301",
    type: "Theory",
    status: "ongoing",
  },
  {
    id: 2,
    subject: "Database Management Systems",
    teacher: "Prof. Meera Sharma",
    time: "10:30 AM - 11:30 AM",
    room: "Lab 102",
    type: "Practical",
    status: "upcoming",
  },
  {
    id: 3,
    subject: "Computer Networks",
    teacher: "Dr. Anil Verma",
    time: "12:00 PM - 01:00 PM",
    room: "Room 205",
    type: "Theory",
    status: "upcoming",
  },
  {
    id: 4,
    subject: "Operating Systems",
    teacher: "Prof. Sunita Patel",
    time: "02:30 PM - 03:30 PM",
    room: "Room 401",
    type: "Theory",
    status: "upcoming",
  },
];

export function TodayClasses() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Today's Schedule</CardTitle>
          <Badge variant="secondary" className="font-normal">
            {todayClasses.length} Classes
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {todayClasses.map((cls) => (
          <div
            key={cls.id}
            className={`p-4 rounded-xl border transition-all ${
              cls.status === "ongoing"
                ? "bg-primary/5 border-primary/20"
                : "bg-card hover:bg-muted/50"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-foreground truncate">
                    {cls.subject}
                  </h3>
                  {cls.status === "ongoing" && (
                    <Badge className="bg-success text-success-foreground text-xs">
                      Live
                    </Badge>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {cls.teacher}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {cls.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {cls.room}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Badge
                  variant="outline"
                  className={
                    cls.type === "Practical"
                      ? "border-accent text-accent"
                      : "border-primary text-primary"
                  }
                >
                  {cls.type}
                </Badge>
                {cls.status === "ongoing" && (
                  <Button size="sm" className="gap-1.5">
                    <Video className="h-4 w-4" />
                    Join
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
