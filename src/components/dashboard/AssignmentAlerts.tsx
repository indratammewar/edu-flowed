import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

const nearDeadlineAssignments = [
  { title: "DBMS Lab Report", subject: "Database Management", dueIn: "2 days" },
  { title: "CN Assignment 4", subject: "Computer Networks", dueIn: "3 days" },
];

export function AssignmentAlerts() {
  if (nearDeadlineAssignments.length === 0) return null;

  return (
    <Card className="border-destructive/30 bg-destructive/5 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-destructive/10">
            <Clock className="h-5 w-5 text-destructive" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-foreground mb-1">Upcoming Deadlines</h3>
            <p className="text-sm text-muted-foreground">
              {nearDeadlineAssignments.map((a, i) => (
                <span key={a.title}>
                  <span className="font-medium text-foreground">{a.title}</span>
                  <span> (due in {a.dueIn})</span>
                  {i < nearDeadlineAssignments.length - 1 && ", "}
                </span>
              ))}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
