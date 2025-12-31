import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, User, Video, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

interface ClassItem {
  id: number;
  subject: string;
  teacher: string;
  time: string;
  room: string;
  type: "Theory" | "Practical";
  status: "completed" | "ongoing" | "upcoming";
  attendanceRisk?: {
    current: number;
    warning: string;
  };
}

const todayClasses: ClassItem[] = [
  {
    id: 1,
    subject: "Data Structures & Algorithms",
    teacher: "Dr. Rajesh Kumar",
    time: "09:00 AM - 10:00 AM",
    room: "Room 301",
    type: "Theory",
    status: "completed",
  },
  {
    id: 2,
    subject: "Computer Networks",
    teacher: "Dr. Anil Verma",
    time: "10:30 AM - 11:30 AM",
    room: "Room 205",
    type: "Theory",
    status: "ongoing",
    attendanceRisk: {
      current: 68,
      warning: "Missing this class drops you to 65% (exam ineligible)",
    },
  },
  {
    id: 3,
    subject: "Database Management Systems",
    teacher: "Prof. Meera Sharma",
    time: "12:00 PM - 01:00 PM",
    room: "Lab 102",
    type: "Practical",
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
    attendanceRisk: {
      current: 72,
      warning: "At risk: 2 absences from threshold",
    },
  },
];

export function TodaySchedule() {
  const completedCount = todayClasses.filter(c => c.status === "completed").length;
  const totalCount = todayClasses.length;
  const hasOngoing = todayClasses.some(c => c.status === "ongoing");

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Today's Classes</CardTitle>
            <p className="text-sm text-muted-foreground mt-0.5">
              {completedCount} of {totalCount} completed
            </p>
          </div>
          <Link to="/calendar">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Full Schedule
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {todayClasses.map((cls) => (
          <div
            key={cls.id}
            className={`p-4 rounded-xl border transition-all ${
              cls.status === "ongoing"
                ? "bg-primary/5 border-primary/30 ring-1 ring-primary/20"
                : cls.status === "completed"
                ? "bg-muted/30 border-border/50 opacity-70"
                : "bg-card hover:bg-muted/30 border-border/50"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  {cls.status === "completed" && (
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                  )}
                  <h3 className={`font-medium truncate ${cls.status === "completed" ? "text-muted-foreground" : "text-foreground"}`}>
                    {cls.subject}
                  </h3>
                  {cls.status === "ongoing" && (
                    <Badge className="bg-success text-success-foreground text-xs shrink-0">
                      Now
                    </Badge>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {cls.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {cls.room}
                  </span>
                </div>

                {/* Attendance Risk Warning */}
                {cls.attendanceRisk && cls.status !== "completed" && (
                  <div className="mt-2 flex items-start gap-1.5 text-xs">
                    <AlertTriangle className="h-3.5 w-3.5 text-warning shrink-0 mt-0.5" />
                    <span className={cls.attendanceRisk.current < 70 ? "text-destructive" : "text-warning"}>
                      {cls.attendanceRisk.warning}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Badge
                  variant="outline"
                  className={
                    cls.type === "Practical"
                      ? "border-accent text-accent"
                      : "border-muted-foreground/50 text-muted-foreground"
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
