import { LMSLayout } from "@/components/LMSLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CalendarDays, Clock, FileText, CheckCircle2, Home, AlertTriangle, XCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const assignments = [
  {
    id: 1,
    title: "English Essay on Hamlet",
    subject: "English",
    dueDate: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours
    weight: 15,
    penalty: "10% per day late. No submissions after 3 days.",
    status: "not-started",
  },
  {
    id: 2,
    title: "Computer Science Project",
    subject: "Computer Science",
    dueDate: new Date(Date.now() + 18 * 60 * 60 * 1000), // 18 hours
    weight: 20,
    penalty: "5% per day late.",
    status: "in-progress",
  },
  {
    id: 3,
    title: "Mathematics Problem Set 3",
    subject: "Mathematics",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
    weight: 10,
    penalty: "Late submissions not accepted.",
    status: "not-started",
  },
  {
    id: 4,
    title: "Physics Lab Report",
    subject: "Physics",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    weight: 8,
    penalty: "5% per day late.",
    status: "not-started",
  },
];

const completed = [
  { id: 5, title: "Biology Lab Worksheet", subject: "Biology", grade: "A", submittedOn: "Jan 10" },
  { id: 6, title: "History Timeline", subject: "History", grade: "B+", submittedOn: "Jan 8" },
];

export default function AssignmentsPage() {
  const getTimeLeft = (dueDate: Date) => {
    const diff = dueDate.getTime() - Date.now();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (hours < 0) return { text: "Overdue", urgency: "overdue" as const };
    if (hours < 6) return { text: `${hours} hours left`, urgency: "critical" as const };
    if (hours < 24) return { text: `${hours} hours left`, urgency: "urgent" as const };
    if (days < 3) return { text: `${days} day${days > 1 ? "s" : ""} left`, urgency: "warning" as const };
    return { text: `${days} days left`, urgency: "normal" as const };
  };

  const getUrgencyStyles = (urgency: string) => {
    switch (urgency) {
      case "overdue": return { bg: "bg-destructive/10 border-destructive/40", text: "text-destructive", badge: "bg-destructive" };
      case "critical": return { bg: "bg-destructive/5 border-destructive/30", text: "text-destructive", badge: "bg-destructive" };
      case "urgent": return { bg: "bg-warning/5 border-warning/30", text: "text-warning", badge: "bg-warning" };
      case "warning": return { bg: "bg-warning/5 border-warning/20", text: "text-warning", badge: "bg-warning" };
      default: return { bg: "bg-card border-border", text: "text-muted-foreground", badge: "bg-secondary" };
    }
  };

  // Sort by urgency
  const sortedAssignments = [...assignments].sort((a, b) => 
    a.dueDate.getTime() - b.dueDate.getTime()
  );

  const criticalCount = sortedAssignments.filter(a => {
    const { urgency } = getTimeLeft(a.dueDate);
    return urgency === "critical" || urgency === "urgent";
  }).length;

  return (
    <LMSLayout>
      <div className="space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center gap-1"><Home className="h-4 w-4" />Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center gap-1"><FileText className="h-4 w-4" />Assignments</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div>
          <h1 className="text-2xl font-bold text-foreground">Assignments</h1>
          <p className="text-muted-foreground mt-1">{sortedAssignments.length} pending · Sorted by deadline</p>
        </div>

        {criticalCount > 0 && (
          <Alert className="border-destructive/40 bg-destructive/10">
            <XCircle className="h-5 w-5 text-destructive" />
            <AlertDescription className="ml-2">
              <span className="font-semibold text-destructive">{criticalCount} assignment{criticalCount > 1 ? "s" : ""} due within 24 hours.</span>
              {" "}Late penalties apply after deadline.
            </AlertDescription>
          </Alert>
        )}

        {/* Pending Assignments */}
        <div className="space-y-3">
          {sortedAssignments.map((assignment) => {
            const timeLeft = getTimeLeft(assignment.dueDate);
            const styles = getUrgencyStyles(timeLeft.urgency);
            
            return (
              <Card key={assignment.id} className={`${styles.bg} border transition-all`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{assignment.title}</h3>
                        <Badge variant="outline" className="text-xs">{assignment.subject}</Badge>
                        <Badge className={`${styles.badge} text-xs`}>{assignment.weight}% of grade</Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className={`h-4 w-4 ${styles.text}`} />
                        <span className={`font-medium ${styles.text}`}>{timeLeft.text}</span>
                        {assignment.status === "in-progress" && (
                          <Badge variant="outline" className="text-xs border-primary text-primary">In Progress</Badge>
                        )}
                      </div>
                      
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Late penalty:</span> {assignment.penalty}
                      </p>
                    </div>
                    
                    <Button size="sm" className={timeLeft.urgency === "critical" ? "bg-destructive hover:bg-destructive/90" : ""}>
                      {assignment.status === "in-progress" ? "Continue" : "Start"} <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Completed */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              Completed ({completed.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-2">
              {completed.map((a) => (
                <div key={a.id} className="p-3 rounded-lg bg-success/5 border border-success/20 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.subject} · {a.submittedOn}</p>
                  </div>
                  <Badge className="bg-success">{a.grade}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </LMSLayout>
  );
}
