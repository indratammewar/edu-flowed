import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const lowAttendanceSubjects = [
  { subject: "Computer Networks", attendance: 68 },
  { subject: "Operating Systems", attendance: 72 },
];

export function AttendanceAlerts() {
  if (lowAttendanceSubjects.length === 0) return null;

  return (
    <Card className="border-warning/30 bg-warning/5 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-warning/10">
            <AlertTriangle className="h-5 w-5 text-warning" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-foreground mb-1">Low Attendance Alert</h3>
            <p className="text-sm text-muted-foreground">
              {lowAttendanceSubjects.map((s, i) => (
                <span key={s.subject}>
                  <span className="font-medium text-foreground">{s.subject}</span>
                  <span> ({s.attendance}%)</span>
                  {i < lowAttendanceSubjects.length - 1 && ", "}
                </span>
              ))}
              {" "}are below 75% threshold.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
